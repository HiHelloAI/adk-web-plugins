/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {CommonModule, NgClass, NgStyle} from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges, Type, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import type {EvalCase} from '../../core/models/Eval';
import {FEATURE_FLAG_SERVICE} from '../../core/services/interfaces/feature-flag';
import {STRING_TO_COLOR_SERVICE} from '../../core/services/interfaces/string-to-color';
import {MediaType} from '../../components/artifact-tab/artifact-tab.component';
import {AudioPlayerComponent} from '../../components/audio-player/audio-player.component';
import {MARKDOWN_COMPONENT, MarkdownComponentInterface} from '../../components/markdown/markdown.component.interface';
import {ChatPanelMessagesInjectionToken} from '../../components/chat-panel/chat-panel.component.i18n';
import {BUTTON_CLICK_HANDLER, ButtonClickHandler} from './custom-markdown.component';
import {WidgetRendererComponent} from '../widgets/core/widget-renderer.component';
import {WidgetActionEvent, PricingCardClickData, FormSubmitData, QuickLinkClickData, Widget, CartActionData} from '../widgets/core/widget-models';
import {WIDGET_DEMO_MESSAGES} from '../widgets/core/widget-demo-data';

const ROOT_AGENT = 'root_agent';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './custom-chat-panel.component.html',
  styleUrl: './custom-chat-panel.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    AudioPlayerComponent,
    NgClass,
    NgStyle,
    WidgetRendererComponent,
  ],
  providers: []
})
export class CustomChatPanelComponent implements OnChanges, AfterViewInit {
  @Input() appName: string = '';
  @Input() messages: any[] = [];
  @Input() isChatMode: boolean = true;
  @Input() evalCase: EvalCase|null = null;
  @Input() isEvalEditMode: boolean = false;
  @Input() isEvalCaseEditing: boolean = false;
  @Input() isEditFunctionArgsEnabled: boolean = false;
  @Input() userInput: string = '';
  @Input() userEditEvalCaseMessage: string = '';
  @Input() selectedFiles: {file: File; url: string}[] = [];
  @Input() updatedSessionState: any|null = null;
  @Input() eventData = new Map<string, any>();
  @Input() isAudioRecording: boolean = false;
  @Input() isVideoRecording: boolean = false;
  @Input() hoveredEventMessageIndices: number[] = [];

  @Output() readonly userInputChange = new EventEmitter<string>();
  @Output() readonly userEditEvalCaseMessageChange = new EventEmitter<string>();
  @Output() readonly clickEvent = new EventEmitter<number>();
  @Output() readonly handleKeydown = new EventEmitter<{event: KeyboardEvent, message: any}>();
  @Output() readonly cancelEditMessage = new EventEmitter<any>();
  @Output() readonly saveEditMessage = new EventEmitter<any>();
  @Output() readonly openViewImageDialog = new EventEmitter<string>();
  @Output() readonly openBase64InNewTab = new EventEmitter<{data: string, mimeType: string}>();
  @Output() readonly editEvalCaseMessage = new EventEmitter<any>();
  @Output() readonly deleteEvalCaseMessage = new EventEmitter<{message: any, index: number}>();
  @Output() readonly editFunctionArgs = new EventEmitter<any>();
  @Output() readonly fileSelect = new EventEmitter<Event>();
  @Output() readonly removeFile = new EventEmitter<number>();
  @Output() readonly removeStateUpdate = new EventEmitter<void>();
  @Output() readonly sendMessage = new EventEmitter<Event>();
  @Output() readonly updateState = new EventEmitter<void>();
  @Output() readonly toggleAudioRecording = new EventEmitter<void>();
  @Output() readonly toggleVideoRecording = new EventEmitter<void>();

  @ViewChild('videoContainer', {read: ElementRef}) videoContainer!: ElementRef;
  @ViewChild('autoScroll') scrollContainer!: ElementRef;
  @ViewChild('messageTextarea') public textarea: ElementRef|undefined;

  scrollInterrupted = false;
  private previousMessageCount = 0;

  protected readonly i18n = inject(ChatPanelMessagesInjectionToken);
  private readonly stringToColorService = inject(STRING_TO_COLOR_SERVICE);
  readonly markdownComponent: Type<MarkdownComponentInterface> = inject(MARKDOWN_COMPONENT);
  private readonly featureFlagService = inject(FEATURE_FLAG_SERVICE);
  private readonly elementRef = inject(ElementRef);
  readonly MediaType = MediaType;

  readonly isMessageFileUploadEnabledObs = this.featureFlagService.isMessageFileUploadEnabled();
  readonly isManualStateUpdateEnabledObs = this.featureFlagService.isManualStateUpdateEnabled();
  readonly isBidiStreamingEnabledObs = this.featureFlagService.isBidiStreamingEnabled();

  // Plugin-specific enhancements
  hoveredMessageIndex = signal<number | null>(null);

  // Theme toggle with localStorage persistence
  isDarkTheme = signal<boolean>(this.loadThemePreference());

  // Demo mode toggle
  isDemoMode = signal<boolean>(false);
  private originalMessages: any[] = [];

  // Required for compatibility with base ChatPanelComponent
  readonly canEditSession = signal(true);

  // Button click handler for widget buttons (exposed to child components)
  public _buttonClickHandler = {
    handleButtonClick: (message: string) => {
      this.handleWidgetButtonClick(message);
    }
  };

  constructor(private sanitizer: DomSanitizer) {
    // Make the handler accessible via the element for child components
    setTimeout(() => {
      (this.elementRef.nativeElement as any)._buttonClickHandler = this._buttonClickHandler;
    });
  }

  /**
   * Load theme preference from localStorage
   * Defaults to false (light theme) if not set
   */
  private loadThemePreference(): boolean {
    try {
      const stored = localStorage.getItem('adk-theme-preference');
      return stored === 'dark';
    } catch {
      return false;
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(isDark: boolean): void {
    try {
      localStorage.setItem('adk-theme-preference', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  ngAfterViewInit() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.addEventListener('wheel', () => {
        this.scrollInterrupted = true;
      });
      this.scrollContainer.nativeElement.addEventListener('touchmove', () => {
        this.scrollInterrupted = true;
      });
    }
  }

  /**
   * Handle button clicks from widget components
   * Automatically sets user input and triggers send
   */
  private handleWidgetButtonClick(message: string) {
    // Set the user input
    this.userInputChange.emit(message);

    // Simulate enter key press to send the message
    setTimeout(() => {
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true
      });
      this.sendMessage.emit(enterEvent as any);
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      if (this.messages.length > this.previousMessageCount) {
        const newMessages = this.messages.slice(this.previousMessageCount);
        if (newMessages.some(m => m.role === 'user')) {
          this.scrollInterrupted = false;
        }
        this.scrollToBottom();
      }
      this.previousMessageCount = this.messages.length;
    }
  }

  scrollToBottom() {
    if (!this.scrollInterrupted && this.scrollContainer?.nativeElement) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTo({
          top: this.scrollContainer.nativeElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 50);
    }
  }

  getAgentNameFromEvent(i: number) {
    const key = this.messages[i].eventId;
    const selectedEvent = this.eventData.get(key);
    return selectedEvent?.author ?? ROOT_AGENT;
  }

  customIconColorClass(i: number) {
    const agentName = this.getAgentNameFromEvent(i);
    return agentName !== ROOT_AGENT ?
        `custom-icon-color-${this.stringToColorService.stc(agentName).replace('#', '')}` :
        '';
  }

  shouldMessageHighlighted(index: number) {
    return this.hoveredEventMessageIndices.includes(index);
  }

  renderGooglerSearch(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  // Plugin enhancements
  onMessageHover(index: number) {
    this.hoveredMessageIndex.set(index);
  }

  onMessageLeave() {
    this.hoveredMessageIndex.set(null);
  }

  getMessageTimestamp(message: any): string {
    // Could be enhanced with actual timestamps from backend
    return new Date().toLocaleTimeString();
  }

  isStreamingMessage(index: number): boolean {
    // Check if this is the last bot message (likely streaming)
    return index === this.messages.length - 2 &&
           this.messages[index]?.role === 'bot' &&
           this.messages[this.messages.length - 1]?.isLoading;
  }

  toggleTheme() {
    this.isDarkTheme.update(value => {
      const newValue = !value;
      this.saveThemePreference(newValue);
      return newValue;
    });
  }

  toggleDemo() {
    const currentDemoState = this.isDemoMode();

    if (!currentDemoState) {
      // Entering demo mode - save current messages and load demo
      this.originalMessages = [...this.messages];
      this.isDemoMode.set(true);
      // Emit the demo messages to parent
      this.messages.splice(0, this.messages.length, ...WIDGET_DEMO_MESSAGES);
    } else {
      // Exiting demo mode - restore original messages
      this.isDemoMode.set(false);
      this.messages.splice(0, this.messages.length, ...this.originalMessages);
      this.originalMessages = [];
    }
  }

  /**
   * Check if a text string contains valid widget JSON data
   */
  isWidgetJson(text: string): boolean {
    if (!text || typeof text !== 'string') {
      return false;
    }

    try {
      const parsed = JSON.parse(text.trim());
      return parsed &&
             typeof parsed === 'object' &&
             parsed.type &&
             ['pricing-cards', 'form', 'quick-links', 'popup', 'container', 'text',
              'table', 'alert', 'progress', 'card-grid', 'accordion', 'timeline',
              'carousel', 'rating', 'cart'].includes(parsed.type);
    } catch {
      return false;
    }
  }

  /**
   * Parse widget JSON from a text string
   * Returns null if parsing fails or if not valid widget JSON
   */
  parseWidget(text: string): Widget | null {
    if (!this.isWidgetJson(text)) {
      return null;
    }

    try {
      return JSON.parse(text.trim()) as Widget;
    } catch {
      return null;
    }
  }

  /**
   * Extract JSON widgets from mixed text content
   * Returns array of parts: { type: 'text' | 'widget', content: string | Widget }
   */
  parseMessageParts(text: string): Array<{type: 'text' | 'widget', content: string | Widget}> {
    if (!text || typeof text !== 'string') {
      return [];
    }

    const parts: Array<{type: 'text' | 'widget', content: string | Widget}> = [];
    let currentIndex = 0;

    // Find all JSON objects in the text
    while (currentIndex < text.length) {
      // Find the next opening brace
      const openBrace = text.indexOf('{', currentIndex);

      if (openBrace === -1) {
        // No more JSON objects, add remaining text
        const remainingText = text.substring(currentIndex).trim();
        if (remainingText) {
          parts.push({ type: 'text', content: remainingText });
        }
        break;
      }

      // Add any text before the JSON
      if (openBrace > currentIndex) {
        const precedingText = text.substring(currentIndex, openBrace).trim();
        if (precedingText) {
          parts.push({ type: 'text', content: precedingText });
        }
      }

      // Try to extract JSON object
      let braceCount = 0;
      let inString = false;
      let escapeNext = false;
      let jsonEnd = openBrace;

      for (let i = openBrace; i < text.length; i++) {
        const char = text[i];

        if (escapeNext) {
          escapeNext = false;
          continue;
        }

        if (char === '\\') {
          escapeNext = true;
          continue;
        }

        if (char === '"') {
          inString = !inString;
          continue;
        }

        if (!inString) {
          if (char === '{') {
            braceCount++;
          } else if (char === '}') {
            braceCount--;
            if (braceCount === 0) {
              jsonEnd = i + 1;
              break;
            }
          }
        }
      }

      // Extract the potential JSON string
      const potentialJson = text.substring(openBrace, jsonEnd);

      // Try to parse it as a widget
      const widget = this.parseWidget(potentialJson);

      if (widget) {
        // Valid widget JSON
        parts.push({ type: 'widget', content: widget });
        currentIndex = jsonEnd;
      } else {
        // Not a valid widget, treat the opening brace as text
        parts.push({ type: 'text', content: '{' });
        currentIndex = openBrace + 1;
      }
    }

    return parts;
  }

  /**
   * Check if text contains mixed content (text + JSON)
   */
  hasMixedContent(text: string): boolean {
    if (!text || typeof text !== 'string') {
      return false;
    }

    const parts = this.parseMessageParts(text);
    return parts.length > 1 || (parts.length === 1 && parts[0].type === 'widget' && text.trim() !== text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
  }

  /**
   * Helper to extract text content from a message part
   */
  getPartText(part: {type: 'text' | 'widget', content: string | Widget}): string {
    return part.content as string;
  }

  /**
   * Helper to extract widget content from a message part
   */
  getPartWidget(part: {type: 'text' | 'widget', content: string | Widget}): Widget {
    return part.content as Widget;
  }

  /**
   * Handle widget action events (pricing card clicks, form submissions, quick link clicks)
   * Formats the interaction data into a message and sends it to the backend
   */
  handleWidgetAction(event: WidgetActionEvent) {
    let formattedMessage = '';

    switch (event.type) {
      case 'pricing-card-click': {
        const data = event.data as PricingCardClickData;
        const card = data.card;
        formattedMessage = `I'd like to select the **${card.title}** plan at ${card.price.currency}${card.price.amount}${card.price.period}.`;
        if (card.id) {
          formattedMessage += ` (Plan ID: ${card.id})`;
        }
        break;
      }

      case 'form-submit': {
        const data = event.data as FormSubmitData;
        formattedMessage = `**${data.title}**\n\n`;
        for (const [fieldLabel, fieldValue] of Object.entries(data.fields)) {
          formattedMessage += `**${fieldLabel}:** ${fieldValue}\n`;
        }
        break;
      }

      case 'quick-link-click': {
        const data = event.data as QuickLinkClickData;
        formattedMessage = data.link.text;
        break;
      }

      case 'cart-action': {
        const data = event.data as CartActionData;
        switch (data.action) {
          case 'checkout':
            formattedMessage = `**Proceed to Checkout**\n\n`;
            formattedMessage += `**Items:** ${data.cartData?.items.length}\n`;
            formattedMessage += `**Subtotal:** $${data.cartData?.subtotal.toFixed(2)}\n`;
            if (data.cartData?.tax) formattedMessage += `**Tax:** $${data.cartData.tax.toFixed(2)}\n`;
            if (data.cartData?.shipping) formattedMessage += `**Shipping:** $${data.cartData.shipping.toFixed(2)}\n`;
            if (data.cartData?.discount) formattedMessage += `**Discount:** -$${data.cartData.discount.toFixed(2)}\n`;
            formattedMessage += `**Total:** $${data.cartData?.total.toFixed(2)}`;
            break;
          case 'continue-shopping':
            formattedMessage = 'Continue shopping';
            break;
          case 'update-quantity':
            const item = data.cartData?.items.find(i => i.id === data.itemId);
            formattedMessage = `Updated ${item?.name} quantity to ${data.newQuantity}`;
            break;
          case 'remove-item':
            const removedItem = data.cartData?.items.find(i => i.id === data.itemId);
            formattedMessage = `Removed ${removedItem?.name} from cart`;
            break;
          default:
            return;
        }
        break;
      }

      case 'popup-open':
      case 'popup-close':
        // These are informational events, no message to send
        return;

      default:
        console.warn('Unknown widget action type:', event.type);
        return;
    }

    // Set the user input and trigger send
    this.handleWidgetButtonClick(formattedMessage);
  }
}

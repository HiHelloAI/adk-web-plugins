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

import {CommonModule} from '@angular/common';
import {Component, computed, input, InjectionToken} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {MarkdownComponentInterface} from '../../components/markdown/markdown.component.interface';

// Injection token for button click handler (used by JSON widget system)
export interface ButtonClickHandler {
  handleButtonClick(message: string): void;
}

export const BUTTON_CLICK_HANDLER = new InjectionToken<ButtonClickHandler>('ButtonClickHandler');

/**
 * Custom HTML renderer for assistant messages.
 * Renders backend HTML content with sanitization.
 *
 * NOTE: For interactive widgets (pricing cards, forms, etc.), use the JSON-based
 * widget system instead. See /plugins/widgets/README.md for documentation.
 */
@Component({
  selector: 'app-custom-markdown',
  templateUrl: './custom-markdown.component.html',
  styleUrl: './custom-markdown.component.scss',
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class CustomMarkdownComponent implements MarkdownComponentInterface {
  text = input<string>('');
  thought = input<boolean>(false);
  theme = input<string>('light');

  constructor(private sanitizer: DomSanitizer) {}

  // Computed property that sanitizes and returns HTML content
  sanitizedHtml = computed<SafeHtml>(() => {
    let htmlContent = this.text();

    // Remove ADK-specific markers
    htmlContent = this.removeAdkMarkers(htmlContent);

    // Sanitize and trust the HTML from backend
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  });

  /**
   * Removes ADK-specific planning and action markers from text.
   */
  private removeAdkMarkers(text: string): string {
    return text
      .replace(/\/\*PLANNING\*\//g, '')
      .replace(/\/\*ACTION\*\//g, '');
  }
}

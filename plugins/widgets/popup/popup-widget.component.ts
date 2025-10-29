/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupWidget, WidgetActionEvent } from '../core/widget-models';
import { WidgetRendererComponent } from '../core/widget-renderer.component';

@Component({
  selector: 'app-popup-widget',
  standalone: true,
  imports: [CommonModule, forwardRef(() => WidgetRendererComponent)],
  templateUrl: './popup-widget.component.html',
  styleUrls: ['./popup-widget.component.scss']
})
export class PopupWidgetComponent {
  @Input() widget!: PopupWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  private idCounter = 0;
  private popupId: string | null = null;

  /**
   * Generate unique IDs for popup triggers and modals
   */
  generateId(): string {
    return `widget-${Date.now()}-${this.idCounter++}`;
  }

  /**
   * Get or generate popup ID (ensures same ID is used for trigger and overlay)
   */
  getPopupId(): string {
    if (!this.popupId) {
      this.popupId = this.generateId();
    }
    return this.popupId;
  }

  /**
   * Handle popup open
   */
  onPopupOpen(event: Event, popupId: string): void {
    event.preventDefault();
    event.stopPropagation();

    const overlay = document.getElementById(popupId);
    if (overlay) {
      overlay.classList.add('widget-popup-overlay--active');

      this.widgetAction.emit({
        type: 'popup-open',
        data: { popupId }
      });
    }
  }

  /**
   * Handle popup close
   */
  onPopupClose(event: Event, popupId: string): void {
    event.preventDefault();
    event.stopPropagation();

    const overlay = document.getElementById(popupId);
    if (overlay) {
      overlay.classList.remove('widget-popup-overlay--active');

      this.widgetAction.emit({
        type: 'popup-close',
        data: { popupId }
      });
    }
  }
}

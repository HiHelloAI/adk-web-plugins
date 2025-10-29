/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLinksWidget, QuickLink, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-quick-links-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-links-widget.component.html',
  styleUrls: ['./quick-links-widget.component.scss']
})
export class QuickLinksWidgetComponent {
  @Input() widget!: QuickLinksWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  /**
   * Handle quick link click
   */
  onQuickLinkClick(event: Event, link: QuickLink): void {
    event.preventDefault();

    this.widgetAction.emit({
      type: 'quick-link-click',
      data: {
        link: link
      }
    });
  }
}

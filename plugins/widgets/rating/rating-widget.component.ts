/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingWidget, WidgetActionEvent } from '../core/widget-models';

/**
 * Rating Widget Component
 * Displays star ratings with review counts
 */
@Component({
  selector: 'app-rating-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-widget.component.html',
  styleUrls: ['./rating-widget.component.scss']
})
export class RatingWidgetComponent {
  @Input() widget!: RatingWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

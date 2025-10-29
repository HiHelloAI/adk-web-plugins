/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-card-grid-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-grid-widget.component.html',
  styleUrls: ['./card-grid-widget.component.scss']
})
export class CardGridWidgetComponent {
  @Input() widget!: CardGridWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

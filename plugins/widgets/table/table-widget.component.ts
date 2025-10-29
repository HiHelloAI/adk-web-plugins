/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-table-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss']
})
export class TableWidgetComponent {
  @Input() widget!: TableWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

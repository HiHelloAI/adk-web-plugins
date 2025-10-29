/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-alert-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-widget.component.html',
  styleUrls: ['./alert-widget.component.scss']
})
export class AlertWidgetComponent {
  @Input() widget!: AlertWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

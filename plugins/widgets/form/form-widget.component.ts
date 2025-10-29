/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-form-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss']
})
export class FormWidgetComponent {
  @Input() widget!: FormWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  /**
   * Handle form submission
   */
  onFormSubmit(event: Event, widget: FormWidget): void {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    // Convert FormData to a plain object
    const data: {[key: string]: any} = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        // Handle multiple values (like checkboxes)
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    this.widgetAction.emit({
      type: 'form-submit',
      data: {
        title: widget.title,
        fields: data
      }
    });
  }
}

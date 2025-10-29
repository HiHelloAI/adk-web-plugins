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

import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerWidget, WidgetActionEvent } from '../core/widget-models';
import { WidgetRendererComponent } from '../core/widget-renderer.component';

/**
 * Container Widget Component
 * Groups multiple widgets with different layout options
 * Supports recursive rendering of child widgets
 */
@Component({
  selector: 'app-container-widget',
  standalone: true,
  imports: [CommonModule, forwardRef(() => WidgetRendererComponent)],
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent {
  @Input() widget!: ContainerWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

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

import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TextWidget } from '../core/widget-models';

/**
 * Text Widget Component
 * Renders sanitized HTML content
 */
@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent {
  @Input() widget!: TextWidget;
  @Input() theme: string = 'light';

  private sanitizer = inject(DomSanitizer);

  /**
   * Sanitize HTML content
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

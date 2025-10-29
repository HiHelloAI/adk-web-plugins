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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget, WidgetActionEvent } from './widget-models';

// Import all widget components
import { PricingCardsWidgetComponent } from '../pricing-cards/pricing-cards.component';
import { FormWidgetComponent } from '../form/form-widget.component';
import { QuickLinksWidgetComponent } from '../quick-links/quick-links-widget.component';
import { PopupWidgetComponent } from '../popup/popup-widget.component';
import { ContainerWidgetComponent } from '../container/container-widget.component';
import { TextWidgetComponent } from '../text/text-widget.component';
import { TableWidgetComponent } from '../table/table-widget.component';
import { AlertWidgetComponent } from '../alert/alert-widget.component';
import { CardGridWidgetComponent } from '../card-grid/card-grid-widget.component';
import { AccordionWidgetComponent } from '../accordion/accordion-widget.component';
import { TimelineWidgetComponent } from '../timeline/timeline-widget.component';
import { CarouselWidgetComponent } from '../carousel/carousel-widget.component';
import { RatingWidgetComponent } from '../rating/rating-widget.component';
import { CartWidgetComponent } from '../cart/cart-widget.component';

/**
 * Widget Renderer Component
 *
 * Renders structured widget data by delegating to individual widget components.
 * Supports recursive rendering for nested widgets (popup, container).
 * Each widget type has its own component with separate HTML, SCSS, and TypeScript files.
 */
@Component({
  selector: 'app-widget-renderer',
  standalone: true,
  imports: [
    CommonModule,
    PricingCardsWidgetComponent,
    FormWidgetComponent,
    QuickLinksWidgetComponent,
    PopupWidgetComponent,
    ContainerWidgetComponent,
    TextWidgetComponent,
    TableWidgetComponent,
    AlertWidgetComponent,
    CardGridWidgetComponent,
    AccordionWidgetComponent,
    TimelineWidgetComponent,
    CarouselWidgetComponent,
    RatingWidgetComponent,
    CartWidgetComponent
  ],
  templateUrl: './widget-renderer.component.html',
  styleUrls: ['./widget-base.scss']
})
export class WidgetRendererComponent {
  @Input() widget!: Widget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}

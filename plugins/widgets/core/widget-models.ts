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

/**
 * Central barrel export file for all widget models
 * Each widget's model is now in its own directory for better organization
 */

// =============================================================================
// Shared Base Types
// =============================================================================

export type WidgetType =
  | 'pricing-cards'
  | 'form'
  | 'quick-links'
  | 'popup'
  | 'container'
  | 'text'
  | 'table'
  | 'alert'
  | 'card-grid'
  | 'accordion'
  | 'timeline'
  | 'carousel'
  | 'rating'
  | 'cart';

export interface BaseWidget {
  type: WidgetType;
}

/**
 * Widget Action Events (for user interactions)
 */
export interface WidgetActionEvent {
  type: 'pricing-card-click' | 'form-submit' | 'quick-link-click' | 'popup-open' | 'popup-close'
      | 'card-click' | 'alert-action' | 'accordion-toggle' | 'rating-change' | 'cart-action';
  data: any;
}

// =============================================================================
// Export all widget models
// =============================================================================
export * from '../pricing-cards/pricing-cards.model';
export * from '../form/form.model';
export * from '../quick-links/quick-links.model';
export * from '../popup/popup.model';
export * from '../container/container.model';
export * from '../text/text.model';
export * from '../table/table.model';
export * from '../alert/alert.model';
export * from '../card-grid/card-grid.model';
export * from '../accordion/accordion.model';
export * from '../timeline/timeline.model';
export * from '../carousel/carousel.model';
export * from '../rating/rating.model';
export * from '../cart/cart.model';

// Import individual widget types for the union type
import type { PricingCardsWidget } from '../pricing-cards/pricing-cards.model';
import type { FormWidget } from '../form/form.model';
import type { QuickLinksWidget } from '../quick-links/quick-links.model';
import type { PopupWidget } from '../popup/popup.model';
import type { ContainerWidget } from '../container/container.model';
import type { TextWidget } from '../text/text.model';
import type { TableWidget } from '../table/table.model';
import type { AlertWidget } from '../alert/alert.model';
import type { CardGridWidget } from '../card-grid/card-grid.model';
import type { AccordionWidget } from '../accordion/accordion.model';
import type { TimelineWidget } from '../timeline/timeline.model';
import type { CarouselWidget } from '../carousel/carousel.model';
import type { RatingWidget } from '../rating/rating.model';
import type { CartWidget } from '../cart/cart.model';

/**
 * Union type of all possible widget types (Recursive)
 * Enables TypeScript discriminated union type narrowing
 */
export type Widget =
  | PricingCardsWidget
  | FormWidget
  | QuickLinksWidget
  | PopupWidget
  | ContainerWidget
  | TextWidget
  | TableWidget
  | AlertWidget
  | CardGridWidget
  | AccordionWidget
  | TimelineWidget
  | CarouselWidget
  | RatingWidget
  | CartWidget;

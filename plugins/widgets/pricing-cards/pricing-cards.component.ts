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
import {
  PricingCardsWidget,
  WidgetActionEvent,
  PricingCard,
  PricingTab
} from '../core/widget-models';

/**
 * Pricing Cards Widget Component
 * Displays product pricing tiers with features and CTAs
 * Supports both simple cards and tabbed layouts (monthly/yearly)
 */
@Component({
  selector: 'app-pricing-cards-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-cards.component.html',
  styleUrls: ['./pricing-cards.component.scss']
})
export class PricingCardsWidgetComponent {
  @Input() widget!: PricingCardsWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  /**
   * Handle pricing card CTA click
   */
  onPricingCardClick(event: Event, card: PricingCard): void {
    event.preventDefault();

    this.widgetAction.emit({
      type: 'pricing-card-click',
      data: {
        card: card,
        ctaText: card.cta.text
      }
    });
  }

  /**
   * Handle tab switching for pricing cards
   */
  onTabClick(event: Event, tabs: PricingTab[], selectedTab: PricingTab): void {
    event.preventDefault();

    const button = event.target as HTMLElement;
    const tabContainer = button.closest('.widget-pricing-tabs');

    if (!tabContainer) return;

    // Find all tabs and containers in the same parent
    const allTabs = Array.from(tabContainer.querySelectorAll('.widget-pricing-tab'));
    const parentElement = tabContainer.parentElement;

    if (!parentElement) return;

    const allContainers = Array.from(
      parentElement.querySelectorAll('.widget-pricing-container')
    );

    // Remove active class from all tabs
    allTabs.forEach(tab => tab.classList.remove('widget-pricing-tab--active'));

    // Add active class to clicked tab
    button.classList.add('widget-pricing-tab--active');

    // Hide all containers and show the selected one
    allContainers.forEach((container: Element) => {
      const htmlContainer = container as HTMLElement;
      const containerTabGroup = container.getAttribute('data-tab-group');

      if (containerTabGroup === selectedTab.id) {
        htmlContainer.style.display = 'grid';
      } else {
        htmlContainer.style.display = 'none';
      }
    });
  }
}

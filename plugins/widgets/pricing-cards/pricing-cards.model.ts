/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface PricingCardPrice {
  currency: string;
  amount: string;
  period: string;
  originalAmount?: string;      // For strikethrough pricing
  discountBadge?: string;        // e.g., "Save 40%"
}

export interface PricingCardFeature {
  text: string;
  enabled: boolean;              // false = disabled/crossed out
}

export interface PricingCardCTA {
  text: string;
  action?: string;               // Optional action identifier
}

export interface PricingCard {
  id?: string;                   // data-offer-id
  title: string;
  description?: string;
  badge?: string;                // "Best Value", "Most Popular"
  price: PricingCardPrice;
  features: PricingCardFeature[];
  cta: PricingCardCTA;
  featured?: boolean;            // Highlighted styling
  colorful?: boolean;            // Dark colorful background
  compact?: boolean;             // Compact layout variant
  metadata?: Record<string, any>; // Additional data attributes
}

export interface PricingTab {
  id: string;                    // data-tab value
  label: string;
  cards: PricingCard[];
}

export interface PricingCardsWidget extends BaseWidget {
  type: 'pricing-cards';
  title?: string;                // Left-aligned title
  subtitle?: string;             // Left-aligned subtitle/description
  cards?: PricingCard[];         // Simple mode
  tabs?: PricingTab[];           // Tabbed mode (monthly/yearly)
  columns?: 1 | 2 | 3 | 4 | 5;   // Grid columns
  layout?: 'default' | 'compact' | 'wide'; // Layout variant
}

export interface PricingCardClickData {
  card: PricingCard;
  ctaText: string;
}

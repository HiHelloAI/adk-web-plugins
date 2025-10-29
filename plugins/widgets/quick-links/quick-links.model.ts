/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface QuickLink {
  text: string;
  icon?: string;                 // Emoji or icon character
  description?: string;          // For quick-link-with-icon variant
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'small' | 'default' | 'large';
  full?: boolean;                // Full width
  action?: string;               // Optional action identifier
  metadata?: Record<string, any>; // Additional data attributes
}

export interface QuickLinksWidget extends BaseWidget {
  type: 'quick-links';
  links: QuickLink[];
  layout?: 'default' | 'grid' | 'column' | 'center';
  withIcons?: boolean;           // Use quick-link-with-icon variant
  card?: {                       // Wrap in card
    title?: string;
    description?: string;
  };
}

export interface QuickLinkClickData {
  link: QuickLink;
}

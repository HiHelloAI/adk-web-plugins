/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface GridCard {
  id?: string;
  image?: string;
  title: string;
  description?: string;
  badge?: string;
  price?: string;
  cta?: { text: string; action?: string };
  metadata?: Record<string, string>;
}

export interface CardGridWidget extends BaseWidget {
  type: 'card-grid';
  title?: string;
  columns?: 2 | 3 | 4;
  cards: GridCard[];
  compact?: boolean;
}

/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface RatingWidget extends BaseWidget {
  type: 'rating';
  value: number;
  max?: number;
  count?: number;
  showReviews?: boolean;
  allowInput?: boolean;
  size?: 'small' | 'default' | 'large';
}

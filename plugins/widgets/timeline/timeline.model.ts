/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  status?: 'completed' | 'in_progress' | 'pending';
  icon?: string;
}

export interface TimelineWidget extends BaseWidget {
  type: 'timeline';
  title?: string;
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
}

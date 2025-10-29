/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';
import type { Widget } from '../core/widget-models';

export interface ContainerWidget extends BaseWidget {
  type: 'container';
  layout: 'vertical' | 'horizontal' | 'grid';
  widgets: Widget[];             // Array of different widgets (RECURSIVE)
  columns?: number;              // For grid layout
  gap?: 'small' | 'default' | 'large';
}

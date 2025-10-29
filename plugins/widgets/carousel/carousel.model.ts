/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface CarouselItem {
  image: string;
  title?: string;
  caption?: string;
  link?: string;
}

export interface CarouselWidget extends BaseWidget {
  type: 'carousel';
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

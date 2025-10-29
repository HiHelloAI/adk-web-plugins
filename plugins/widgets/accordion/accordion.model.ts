/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface AccordionItem {
  id?: string;
  title: string;
  content: string;
  expanded?: boolean;
  icon?: string;
}

export interface AccordionWidget extends BaseWidget {
  type: 'accordion';
  title?: string;
  items: AccordionItem[];
  allowMultiple?: boolean;
  bordered?: boolean;
}

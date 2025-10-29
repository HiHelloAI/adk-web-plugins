/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';
import type { Widget } from '../core/widget-models';

export interface PopupTrigger {
  text?: string;
  icon?: string;
  style: 'icon-only' | 'text-only' | 'button' | 'inline';
  tooltip?: string;
}

export interface PopupWidget extends BaseWidget {
  type: 'popup';
  trigger: PopupTrigger;
  title?: string;                // Modal header title
  content: Widget;               // Nested widget (RECURSIVE)
  size?: 'small' | 'medium' | 'large' | 'fullwidth';
  inline?: boolean;              // Inline dropdown vs modal overlay
  alignment?: 'left' | 'right' | 'center'; // For inline popups
}

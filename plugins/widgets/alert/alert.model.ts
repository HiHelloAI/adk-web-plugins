/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface AlertAction {
  text: string;
  variant?: 'default' | 'primary' | 'success' | 'danger';
}

export interface AlertWidget extends BaseWidget {
  type: 'alert';
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  actions?: AlertAction[];
  icon?: string;
}

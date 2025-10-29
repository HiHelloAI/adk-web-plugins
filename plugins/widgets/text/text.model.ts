/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface TextWidget extends BaseWidget {
  type: 'text';
  content: string;               // Plain text or HTML (sanitized)
  markdown?: boolean;            // Render as markdown
}

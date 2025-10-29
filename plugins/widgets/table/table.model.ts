/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableWidget extends BaseWidget {
  type: 'table';
  title?: string;
  columns: TableColumn[];
  rows: Record<string, any>[];
  striped?: boolean;
  compact?: boolean;
  bordered?: boolean;
}

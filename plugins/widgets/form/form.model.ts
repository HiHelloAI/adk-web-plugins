/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 */

import { BaseWidget } from '../core/widget-models';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'select'
  | 'textarea'
  | 'radio'
  | 'checkbox';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  type: FormFieldType;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: FormFieldOption[];   // For select, radio, checkbox
  value?: string;                // Default value
}

export interface FormWidget extends BaseWidget {
  type: 'form';
  title: string;
  description?: string;
  fields: FormField[];
  submitText?: string;           // Default: "Submit"
  cancelText?: string;           // Optional cancel button
  resetText?: string;            // Default: "Reset" (always shown)
  showResetButton?: boolean;     // Default: true
  actionsAlign?: 'left' | 'center' | 'right' | 'spread'; // Default: right
  layout?: 'default' | 'compact' | 'wide' | 'fullwidth';
}

export interface FormSubmitData {
  title: string;
  fields: Record<string, any>; // field name → value
}

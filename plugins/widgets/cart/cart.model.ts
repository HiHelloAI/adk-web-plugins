/**
 * @license
 * Copyright 2025 HiHelloAI (www.hihelloai.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {BaseWidget} from '../core/widget-models';

/**
 * Shopping Cart Widget
 * Displays cart items with quantities, prices, and checkout functionality
 */
export interface CartWidget extends BaseWidget {
  type: 'cart';
  title?: string;
  items: CartItem[];
  currency?: string; // Default: '$'
  subtotal?: number; // Auto-calculated if not provided
  tax?: CartTax;
  shipping?: CartShipping;
  discount?: CartDiscount;
  total?: number; // Auto-calculated if not provided
  checkoutButton?: CartButton;
  continueShoppingButton?: CartButton;
  emptyMessage?: string; // Message when cart is empty
  showItemImages?: boolean; // Default: true
  variant?: 'default' | 'compact'; // Display style
}

/**
 * Individual cart item
 */
export interface CartItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  maxQuantity?: number; // Maximum allowed quantity
  currency?: string; // Overrides cart currency
  metadata?: Record<string, any>; // Custom data (size, color, etc.)
  editable?: boolean; // Can quantity be changed? Default: true
  removable?: boolean; // Can item be removed? Default: true
}

/**
 * Tax configuration
 */
export interface CartTax {
  label?: string; // Default: 'Tax'
  amount?: number; // Fixed amount
  percentage?: number; // Percentage of subtotal
  included?: boolean; // Is tax included in prices? Default: false
}

/**
 * Shipping configuration
 */
export interface CartShipping {
  label?: string; // Default: 'Shipping'
  amount: number;
  method?: string; // e.g., 'Standard', 'Express'
  estimatedDays?: string; // e.g., '3-5 business days'
  free?: boolean; // Show as 'FREE' instead of amount
}

/**
 * Discount/coupon configuration
 */
export interface CartDiscount {
  label?: string; // Default: 'Discount'
  code?: string; // Coupon code
  amount?: number; // Fixed discount amount
  percentage?: number; // Percentage discount
}

/**
 * Button configuration
 */
export interface CartButton {
  text: string;
  action?: string; // Custom action identifier
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: string;
  disabled?: boolean;
}

/**
 * Cart action event data
 */
export interface CartActionData {
  action: 'checkout' | 'continue-shopping' | 'update-quantity' | 'remove-item' | 'apply-coupon';
  cartData?: {
    items: CartItem[];
    subtotal: number;
    tax?: number;
    shipping?: number;
    discount?: number;
    total: number;
  };
  itemId?: string; // For update-quantity or remove-item
  newQuantity?: number; // For update-quantity
  couponCode?: string; // For apply-coupon
}

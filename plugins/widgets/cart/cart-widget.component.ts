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

import {Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartWidget, CartItem, CartActionData} from './cart.model';
import {WidgetActionEvent} from '../core/widget-models';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.scss',
})
export class CartWidgetComponent {
  widget = input.required<CartWidget>();
  theme = input<string>('light');
  widgetAction = output<WidgetActionEvent>();

  /**
   * Get currency symbol (defaults to $ if not specified)
   */
  getCurrency(item?: CartItem): string {
    return item?.currency || this.widget().currency || '$';
  }

  /**
   * Calculate subtotal
   */
  getSubtotal(): number {
    if (this.widget().subtotal !== undefined) {
      return this.widget().subtotal!;
    }
    return this.widget().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /**
   * Calculate tax amount
   */
  getTaxAmount(): number {
    const tax = this.widget().tax;
    if (!tax) return 0;

    if (tax.amount !== undefined) {
      return tax.amount;
    }

    if (tax.percentage !== undefined) {
      return this.getSubtotal() * (tax.percentage / 100);
    }

    return 0;
  }

  /**
   * Get shipping amount
   */
  getShippingAmount(): number {
    const shipping = this.widget().shipping;
    if (!shipping || shipping.free) return 0;
    return shipping.amount;
  }

  /**
   * Calculate discount amount
   */
  getDiscountAmount(): number {
    const discount = this.widget().discount;
    if (!discount) return 0;

    if (discount.amount !== undefined) {
      return discount.amount;
    }

    if (discount.percentage !== undefined) {
      return this.getSubtotal() * (discount.percentage / 100);
    }

    return 0;
  }

  /**
   * Calculate total
   */
  getTotal(): number {
    if (this.widget().total !== undefined) {
      return this.widget().total!;
    }

    const subtotal = this.getSubtotal();
    const tax = this.getTaxAmount();
    const shipping = this.getShippingAmount();
    const discount = this.getDiscountAmount();

    return subtotal + tax + shipping - discount;
  }

  /**
   * Format price for display
   */
  formatPrice(amount: number, currency?: string): string {
    const curr = currency || this.getCurrency();
    return `${curr}${amount.toFixed(2)}`;
  }

  /**
   * Handle quantity change
   */
  onQuantityChange(item: CartItem, newQuantity: number): void {
    // Validate quantity
    if (newQuantity < 1) return;
    if (item.maxQuantity && newQuantity > item.maxQuantity) return;

    // Update quantity locally
    item.quantity = newQuantity;

    // Emit event
    this.widgetAction.emit({
      type: 'cart-action',
      data: {
        action: 'update-quantity',
        itemId: item.id,
        newQuantity: newQuantity,
        cartData: this.getCartData(),
      } as CartActionData,
    });
  }

  /**
   * Handle item removal
   */
  onRemoveItem(item: CartItem): void {
    this.widgetAction.emit({
      type: 'cart-action',
      data: {
        action: 'remove-item',
        itemId: item.id,
        cartData: this.getCartData(),
      } as CartActionData,
    });
  }

  /**
   * Handle checkout
   */
  onCheckout(): void {
    this.widgetAction.emit({
      type: 'cart-action',
      data: {
        action: 'checkout',
        cartData: this.getCartData(),
      } as CartActionData,
    });
  }

  /**
   * Handle continue shopping
   */
  onContinueShopping(): void {
    this.widgetAction.emit({
      type: 'cart-action',
      data: {
        action: 'continue-shopping',
      } as CartActionData,
    });
  }

  /**
   * Get current cart data
   */
  private getCartData() {
    return {
      items: this.widget().items,
      subtotal: this.getSubtotal(),
      tax: this.getTaxAmount(),
      shipping: this.getShippingAmount(),
      discount: this.getDiscountAmount(),
      total: this.getTotal(),
    };
  }

  /**
   * Check if item quantity can be edited
   */
  canEditQuantity(item: CartItem): boolean {
    return item.editable !== false;
  }

  /**
   * Check if item can be removed
   */
  canRemoveItem(item: CartItem): boolean {
    return item.removable !== false;
  }

  /**
   * Get item metadata as display string
   */
  getMetadataDisplay(item: CartItem): string {
    if (!item.metadata) return '';

    return Object.entries(item.metadata)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' • ');
  }
}

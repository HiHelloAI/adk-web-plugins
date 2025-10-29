# ADK Web Widget System

A powerful, JSON-based widget framework for building rich, interactive chat interfaces in ADK Web. Send structured data from your backend, get beautiful UI components with full type safety and event handling.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [How to Use Existing Widgets](#how-to-use-existing-widgets)
4. [How to Add New Widgets](#how-to-add-new-widgets)
5. [Widget Catalog](#widget-catalog)
6. [Event Handling System](#event-handling-system)
7. [Demo Mode](#demo-mode)
8. [Advanced Topics](#advanced-topics)

---

## Quick Start

### Backend: Sending Widgets

Widgets are sent as JSON strings in the `text` field of chat messages:

```python
# Python example
import json

widget = {
    "type": "pricing-cards",
    "columns": 3,
    "cards": [{
        "title": "Basic",
        "price": {"currency": "$", "amount": "9.99", "period": "/mo"},
        "features": [{"text": "10 GB Storage", "enabled": True}],
        "cta": {"text": "Select Plan"}
    }]
}

message = {
    "role": "bot",
    "text": json.dumps(widget)
}
```

### Frontend: Automatic Rendering

The frontend automatically detects and renders widget JSON. No configuration needed!

```typescript
// Widgets are automatically detected and rendered by CustomChatPanelComponent
// Detection: isWidgetMessage(content) checks for valid widget JSON
// Rendering: WidgetRendererComponent handles all 13 widget types
```

---

## Architecture Overview

### Directory Structure

```
src/app/plugins/widgets/
├── core/
│   ├── widget-models.ts              # Central type definitions & barrel exports
│   ├── widget-renderer.component.ts  # Main rendering orchestrator
│   ├── widget-renderer.component.html # Template with widget type switching
│   └── widget-base.scss              # Shared CSS variables & utilities
│
├── pricing-cards/
│   ├── pricing-cards.component.ts    # Component logic
│   ├── pricing-cards.component.html  # Template
│   ├── pricing-cards.component.scss  # Styles
│   └── pricing-cards.model.ts        # TypeScript interfaces
│
├── form/
│   ├── form-widget.component.ts
│   ├── form-widget.component.html
│   ├── form-widget.component.scss
│   └── form.model.ts
│
├── ... (11 more widget directories)
│
├── widget-demo-data.ts               # Demo mode data (20+ examples)
└── README.md                         # This file
```

### Key Design Principles

1. **Self-Contained Widgets**: Each widget has its own directory with `.ts`, `.html`, `.scss`, and `.model.ts` files
2. **Centralized Types**: `widget-models.ts` provides barrel exports and shared types
3. **Type-Safe Rendering**: Discriminated union types ensure correct widget data structure
4. **Event Bubbling**: Events flow from widget → renderer → chat panel
5. **Theme Awareness**: All widgets use CSS custom properties for light/dark theme support
6. **Recursive Rendering**: Container and popup widgets can nest any other widget type

### Data Flow

```
Backend (Python/Java)
    ↓ JSON string in message.text
CustomChatPanelComponent.isWidgetMessage()
    ↓ Detects widget JSON
WidgetRendererComponent
    ↓ Renders based on widget.type
Individual Widget Component (e.g., PricingCardsComponent)
    ↓ User interaction (click, submit)
@Output() widgetAction.emit()
    ↓ Event bubbles up
CustomChatPanelComponent.handleWidgetAction()
    ↓ Formats user message
Backend receives formatted message
```

---

## How to Use Existing Widgets

### 1. Pricing Cards

Display subscription plans, product tiers, or service offerings.

**Features:**
- Regular and discounted pricing with strikethrough
- Featured cards with special styling
- Tabbed pricing (e.g., Monthly vs Yearly)
- Badges (e.g., "Most Popular", "Best Value")
- Enabled/disabled features with checkmarks
- Compact and colorful layouts

**Basic Example:**
```json
{
  "type": "pricing-cards",
  "title": "Choose Your Perfect Plan",
  "subtitle": "Flexible pricing that grows with your business. Switch plans anytime.",
  "columns": 3,
  "cards": [
    {
      "id": "plan_001",
      "title": "Starter",
      "description": "Perfect for individuals",
      "price": {
        "currency": "$",
        "amount": "19.99",
        "period": "/mo"
      },
      "features": [
        { "text": "10 GB Storage", "enabled": true },
        { "text": "Basic Support", "enabled": true },
        { "text": "Advanced Analytics", "enabled": false }
      ],
      "cta": {
        "text": "Choose Plan",
        "action": "select_plan"
      }
    }
  ]
}
```

**Header Fields:**
- `title` (optional): Main heading displayed at the top of the pricing cards section
- `subtitle` (optional): Descriptive text displayed below the title
- Both fields are center-aligned and styled consistently with the pricing theme

**Discounted Pricing:**
```json
{
  "price": {
    "currency": "$",
    "amount": "39.99",
    "period": "/mo",
    "originalAmount": "49.99",
    "discountBadge": "Save 20%"
  }
}
```
Renders as: ~~$49.99/mo~~ **Save 20%** → $39.99/mo

**Tabbed Pricing with Discounts - Complete Example:**

This example shows monthly vs yearly plans, with yearly plans showing discounted pricing:

```json
{
  "type": "pricing-cards",
  "title": "Choose Your Perfect Plan",
  "subtitle": "Flexible pricing that grows with your business. Switch plans anytime.",
  "columns": 3,
  "tabs": [
    {
      "id": "monthly",
      "label": "Monthly Billing",
      "cards": [
        {
          "id": "starter_monthly",
          "title": "Starter",
          "description": "Perfect for individuals",
          "badge": "Popular",
          "price": {
            "currency": "$",
            "amount": "29",
            "period": "/month"
          },
          "features": [
            { "text": "10 GB Storage", "enabled": true },
            { "text": "5 Team Members", "enabled": true },
            { "text": "Basic Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": false },
            { "text": "Custom Integrations", "enabled": false }
          ],
          "cta": {
            "text": "Start Free Trial",
            "action": "select_plan"
          }
        },
        {
          "id": "pro_monthly",
          "title": "Professional",
          "description": "For growing teams",
          "badge": "Best Value",
          "featured": true,
          "price": {
            "currency": "$",
            "amount": "79",
            "period": "/month"
          },
          "features": [
            { "text": "100 GB Storage", "enabled": true },
            { "text": "25 Team Members", "enabled": true },
            { "text": "Priority Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": true },
            { "text": "Custom Integrations", "enabled": false }
          ],
          "cta": {
            "text": "Start Free Trial",
            "action": "select_plan"
          }
        },
        {
          "id": "enterprise_monthly",
          "title": "Enterprise",
          "description": "For large organizations",
          "price": {
            "currency": "$",
            "amount": "199",
            "period": "/month"
          },
          "features": [
            { "text": "Unlimited Storage", "enabled": true },
            { "text": "Unlimited Team Members", "enabled": true },
            { "text": "24/7 Phone Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": true },
            { "text": "Custom Integrations", "enabled": true }
          ],
          "cta": {
            "text": "Contact Sales",
            "action": "select_plan"
          }
        }
      ]
    },
    {
      "id": "yearly",
      "label": "Yearly Billing (Save up to 25%)",
      "cards": [
        {
          "id": "starter_yearly",
          "title": "Starter",
          "description": "Perfect for individuals",
          "badge": "Popular",
          "price": {
            "currency": "$",
            "amount": "24",
            "period": "/month",
            "originalAmount": "29",
            "discountBadge": "Save 17%"
          },
          "features": [
            { "text": "10 GB Storage", "enabled": true },
            { "text": "5 Team Members", "enabled": true },
            { "text": "Basic Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": false },
            { "text": "Custom Integrations", "enabled": false }
          ],
          "cta": {
            "text": "Subscribe Yearly",
            "action": "select_plan"
          }
        },
        {
          "id": "pro_yearly",
          "title": "Professional",
          "description": "For growing teams",
          "badge": "Best Value",
          "featured": true,
          "price": {
            "currency": "$",
            "amount": "59",
            "period": "/month",
            "originalAmount": "79",
            "discountBadge": "Save 25%"
          },
          "features": [
            { "text": "100 GB Storage", "enabled": true },
            { "text": "25 Team Members", "enabled": true },
            { "text": "Priority Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": true },
            { "text": "Custom Integrations", "enabled": false }
          ],
          "cta": {
            "text": "Subscribe Yearly",
            "action": "select_plan"
          }
        },
        {
          "id": "enterprise_yearly",
          "title": "Enterprise",
          "description": "For large organizations",
          "price": {
            "currency": "$",
            "amount": "159",
            "period": "/month",
            "originalAmount": "199",
            "discountBadge": "Save 20%"
          },
          "features": [
            { "text": "Unlimited Storage", "enabled": true },
            { "text": "Unlimited Team Members", "enabled": true },
            { "text": "24/7 Phone Support", "enabled": true },
            { "text": "Advanced Analytics", "enabled": true },
            { "text": "Custom Integrations", "enabled": true }
          ],
          "cta": {
            "text": "Contact Sales",
            "action": "select_plan"
          }
        }
      ]
    }
  ]
}
```

**Rendering Details:**
- **Monthly Tab**: Shows regular pricing at full price
- **Yearly Tab**: Shows discounted pricing with strikethrough original price above current price
- **Example**: Yearly Professional plan shows ~~$79/month~~ **Save 25%** → $59/month
- **Featured Card**: The "Professional" plan has special styling to highlight it
- **Tab Label**: "Yearly Billing (Save up to 25%)" encourages users to switch tabs

**User Interaction:**
When user clicks "Subscribe Yearly" on Professional plan, backend receives:
```
I'd like to select the **Professional** plan at $59/month. (Plan ID: pro_yearly)
```

**Type Reference:** See [pricing-cards.model.ts](pricing-cards/pricing-cards.model.ts)

**Complete Pricing Page Example - Container with Title, Tabbed Cards, and Quick Links:**

This example combines multiple widgets to create a complete pricing page:

```json
{
  "type": "container",
  "layout": "vertical",
  "widgets": [
    {
      "type": "text",
      "content": "<div style='text-align: center; margin-bottom: 20px;'><h2 style='font-size: 32px; font-weight: 700; margin-bottom: 8px;'>Choose Your Perfect Plan</h2><p style='font-size: 16px; color: #666; margin: 0;'>Flexible pricing that grows with your business. Switch plans anytime.</p></div>"
    },
    {
      "type": "pricing-cards",
      "columns": 3,
      "tabs": [
        {
          "id": "monthly",
          "label": "Monthly",
          "cards": [
            {
              "id": "basic_monthly",
              "title": "Basic",
              "description": "For individuals",
              "price": {
                "currency": "$",
                "amount": "19",
                "period": "/mo"
              },
              "features": [
                { "text": "5 Projects", "enabled": true },
                { "text": "10 GB Storage", "enabled": true },
                { "text": "Email Support", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": false },
                { "text": "Priority Support", "enabled": false }
              ],
              "cta": { "text": "Get Started" }
            },
            {
              "id": "pro_monthly",
              "title": "Pro",
              "description": "For professionals",
              "badge": "Most Popular",
              "featured": true,
              "price": {
                "currency": "$",
                "amount": "49",
                "period": "/mo"
              },
              "features": [
                { "text": "Unlimited Projects", "enabled": true },
                { "text": "100 GB Storage", "enabled": true },
                { "text": "Priority Email Support", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": true },
                { "text": "Priority Support", "enabled": false }
              ],
              "cta": { "text": "Get Started" }
            },
            {
              "id": "enterprise_monthly",
              "title": "Enterprise",
              "description": "For large teams",
              "price": {
                "currency": "$",
                "amount": "99",
                "period": "/mo"
              },
              "features": [
                { "text": "Unlimited Projects", "enabled": true },
                { "text": "Unlimited Storage", "enabled": true },
                { "text": "24/7 Phone & Email", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": true },
                { "text": "Priority Support", "enabled": true }
              ],
              "cta": { "text": "Contact Sales" }
            }
          ]
        },
        {
          "id": "yearly",
          "label": "Yearly (Save up to 30%)",
          "cards": [
            {
              "id": "basic_yearly",
              "title": "Basic",
              "description": "For individuals",
              "price": {
                "currency": "$",
                "amount": "15",
                "period": "/mo",
                "originalAmount": "19",
                "discountBadge": "Save 21%"
              },
              "features": [
                { "text": "5 Projects", "enabled": true },
                { "text": "10 GB Storage", "enabled": true },
                { "text": "Email Support", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": false },
                { "text": "Priority Support", "enabled": false }
              ],
              "cta": { "text": "Subscribe Now" }
            },
            {
              "id": "pro_yearly",
              "title": "Pro",
              "description": "For professionals",
              "badge": "Best Value",
              "featured": true,
              "price": {
                "currency": "$",
                "amount": "34",
                "period": "/mo",
                "originalAmount": "49",
                "discountBadge": "Save 30%"
              },
              "features": [
                { "text": "Unlimited Projects", "enabled": true },
                { "text": "100 GB Storage", "enabled": true },
                { "text": "Priority Email Support", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": true },
                { "text": "Priority Support", "enabled": false }
              ],
              "cta": { "text": "Subscribe Now" }
            },
            {
              "id": "enterprise_yearly",
              "title": "Enterprise",
              "description": "For large teams",
              "price": {
                "currency": "$",
                "amount": "79",
                "period": "/mo",
                "originalAmount": "99",
                "discountBadge": "Save 20%"
              },
              "features": [
                { "text": "Unlimited Projects", "enabled": true },
                { "text": "Unlimited Storage", "enabled": true },
                { "text": "24/7 Phone & Email", "enabled": true },
                { "text": "Analytics Dashboard", "enabled": true },
                { "text": "Priority Support", "enabled": true }
              ],
              "cta": { "text": "Contact Sales" }
            }
          ]
        }
      ]
    },
    {
      "type": "quick-links",
      "layout": "center",
      "links": [
        {
          "text": "Compare All Features",
          "icon": "📊",
          "variant": "default",
          "description": "See detailed feature comparison"
        },
        {
          "text": "Talk to Sales",
          "icon": "💬",
          "variant": "primary",
          "description": "Get a custom enterprise quote"
        },
        {
          "text": "View FAQ",
          "icon": "❓",
          "variant": "default",
          "description": "Common questions answered"
        }
      ]
    }
  ]
}
```

**What This Renders:**

1. **Header Section** (Text Widget):
   - Centered title: "Choose Your Perfect Plan"
   - Subtitle: "Flexible pricing that grows with your business. Switch plans anytime."

2. **Pricing Cards** (Tabbed):
   - **Monthly Tab**: Full price (Basic $19, Pro $49, Enterprise $99)
   - **Yearly Tab**: Discounted prices with strikethrough
     - Basic: ~~$19~~ → $15/mo (Save 21%)
     - Pro: ~~$49~~ → $34/mo (Save 30%)
     - Enterprise: ~~$99~~ → $79/mo (Save 20%)
   - Pro plan is featured with "Most Popular" or "Best Value" badge

3. **Quick Actions** (Below pricing):
   - Compare All Features - Opens detailed comparison
   - Talk to Sales - Contact for custom quote
   - View FAQ - Help documentation

**Use Case:**
Perfect for displaying a complete pricing page in chat. Users can:
- Switch between billing periods
- See discounts on yearly plans
- Select a plan
- Access additional resources

**Type Reference:** See [pricing-cards.model.ts](pricing-cards/pricing-cards.model.ts)

---

### 2. Forms

Collect user input with various field types and validation.

**Features:**
- Text, email, textarea, select, radio, checkbox fields
- Required field validation
- Helper text and placeholders
- Compact spacing with reset button
- Customizable button alignment

**Basic Example:**
```json
{
  "type": "form",
  "title": "Contact Us",
  "description": "We'll get back to you within 24 hours",
  "fields": [
    {
      "type": "text",
      "name": "fullName",
      "label": "Full Name",
      "required": true,
      "placeholder": "John Doe"
    },
    {
      "type": "email",
      "name": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "john@example.com",
      "helperText": "We'll never share your email"
    },
    {
      "type": "select",
      "name": "country",
      "label": "Country",
      "options": [
        { "value": "us", "label": "United States" },
        { "value": "uk", "label": "United Kingdom" }
      ]
    }
  ],
  "submitText": "Send Message",
  "cancelText": "Reset",
  "actionsAlign": "right"
}
```

**User Interaction:**
When user submits form, backend receives:
```
**Contact Us**

**Full Name:** John Doe
**Email Address:** john@example.com
**Country:** United States
```

**Type Reference:** See [form.model.ts](form/form.model.ts)

---

### 3. Quick Links

Action buttons for navigation and quick actions.

**Features:**
- Grid, column, or centered layouts
- Icon support (emoji or text)
- Multiple button variants (default, primary, success, warning, danger)
- Optional card wrapper with title and description

**Basic Example:**
```json
{
  "type": "quick-links",
  "layout": "grid",
  "links": [
    {
      "text": "View Account",
      "icon": "👤",
      "variant": "default"
    },
    {
      "text": "Pay Bill",
      "icon": "💳",
      "variant": "primary"
    }
  ]
}
```

**With Card Wrapper:**
```json
{
  "type": "quick-links",
  "layout": "column",
  "card": {
    "title": "Popular Actions",
    "description": "Choose an action to get started"
  },
  "links": [
    {
      "text": "View Account Details",
      "icon": "📊",
      "description": "Check your account information"
    }
  ]
}
```

**User Interaction:**
When user clicks "View Account", backend receives:
```
View Account
```

**Type Reference:** See [quick-links.model.ts](quick-links/quick-links.model.ts)

---

### 4. Popups

Modal dialogs that can contain any other widget type (recursive).

**Basic Example:**
```json
{
  "type": "popup",
  "trigger": {
    "text": "View Details",
    "icon": "ℹ️",
    "style": "button"
  },
  "title": "Plan Details",
  "size": "medium",
  "content": {
    "type": "pricing-cards",
    "columns": 2,
    "cards": [...]
  }
}
```

**Nested Form Example:**
```json
{
  "type": "popup",
  "trigger": {
    "text": "Contact Us",
    "icon": "✉️",
    "style": "button"
  },
  "title": "Get in Touch",
  "size": "medium",
  "content": {
    "type": "form",
    "fields": [
      {"type": "email", "name": "email", "label": "Email", "required": true},
      {"type": "textarea", "name": "message", "label": "Message", "required": true}
    ],
    "submitText": "Send"
  }
}
```

**Type Reference:** See [popup.model.ts](popup/popup.model.ts)

---

### 5. Containers

Group multiple widgets vertically or horizontally.

**Example:**
```json
{
  "type": "container",
  "layout": "vertical",
  "widgets": [
    {
      "type": "text",
      "content": "<h3>Special Offer</h3><p>Limited time pricing:</p>"
    },
    {
      "type": "pricing-cards",
      "columns": 2,
      "cards": [...]
    },
    {
      "type": "quick-links",
      "layout": "center",
      "links": [{"text": "Learn More"}]
    }
  ]
}
```

**Type Reference:** See [container.model.ts](container/container.model.ts)

---

### 6. Text Widget

Rich HTML content with sanitization.

```json
{
  "type": "text",
  "content": "<h2>Welcome!</h2><p>This is <strong>rich HTML</strong> content.</p>"
}
```

**Type Reference:** See [text.model.ts](text/text.model.ts)

---

### 7. Table Widget

Display structured data with alignment and styling options.

```json
{
  "type": "table",
  "title": "Plan Comparison",
  "columns": [
    { "key": "feature", "label": "Feature" },
    { "key": "basic", "label": "Basic", "align": "center" },
    { "key": "pro", "label": "Pro", "align": "center" }
  ],
  "rows": [
    { "feature": "Storage", "basic": "10 GB", "pro": "100 GB" },
    { "feature": "Users", "basic": "5", "pro": "25" }
  ],
  "striped": true,
  "bordered": true
}
```

**Type Reference:** See [table.model.ts](table/table.model.ts)

---

### 8. Alert Widget

Display notifications, warnings, and messages.

```json
{
  "type": "alert",
  "variant": "warning",
  "icon": "⚠️",
  "title": "Payment Method Expiring",
  "message": "Your credit card will expire in 10 days.",
  "dismissible": true,
  "actions": [
    { "text": "Update Now", "variant": "primary" },
    { "text": "Remind Later", "variant": "default" }
  ]
}
```

**Variants:** `info`, `success`, `warning`, `error`

**Type Reference:** See [alert.model.ts](alert/alert.model.ts)

---

### 9. Card Grid Widget

Display products or content in responsive grid.

```json
{
  "type": "card-grid",
  "title": "Featured Products",
  "columns": 3,
  "cards": [
    {
      "id": "prod1",
      "title": "Premium Laptop",
      "description": "High-performance laptop",
      "image": "https://example.com/laptop.jpg",
      "badge": "New",
      "price": "$1,299",
      "cta": { "text": "View Details" }
    }
  ]
}
```

**Type Reference:** See [card-grid.model.ts](card-grid/card-grid.model.ts)

---

### 10. Accordion Widget

Collapsible panels for FAQs.

```json
{
  "type": "accordion",
  "title": "Frequently Asked Questions",
  "items": [
    {
      "id": "faq1",
      "title": "How do I get started?",
      "content": "Simply sign up and follow our onboarding wizard.",
      "icon": "❓",
      "expanded": true
    }
  ],
  "bordered": true,
  "allowMultiple": false
}
```

**Type Reference:** See [accordion.model.ts](accordion/accordion.model.ts)

---

### 11. Timeline Widget

Display chronological events.

```json
{
  "type": "timeline",
  "title": "Order Tracking",
  "items": [
    {
      "date": "Jan 15, 2025",
      "title": "Order Placed",
      "description": "Order #12345 successfully placed",
      "status": "completed",
      "icon": "📦"
    },
    {
      "date": "Jan 17, 2025",
      "title": "Shipped",
      "status": "in_progress",
      "icon": "🚚"
    }
  ]
}
```

**Type Reference:** See [timeline.model.ts](timeline/timeline.model.ts)

---

### 12. Carousel Widget

Image slider for galleries.

```json
{
  "type": "carousel",
  "title": "Product Gallery",
  "items": [
    {
      "image": "https://example.com/image1.jpg",
      "caption": "Front view"
    },
    {
      "image": "https://example.com/image2.jpg",
      "caption": "Side view"
    }
  ],
  "autoplay": false,
  "interval": 5000
}
```

**Type Reference:** See [carousel.model.ts](carousel/carousel.model.ts)

---

### 13. Rating Widget

Display star ratings.

```json
{
  "type": "rating",
  "value": 4.5,
  "max": 5,
  "count": 1284,
  "size": "default",
  "showReviews": true,
  "readonly": true
}
```

**Type Reference:** See [rating.model.ts](rating/rating.model.ts)

---

## How to Add New Widgets

Follow these steps to create a new widget from scratch.

### Step 1: Create Widget Directory

```bash
cd src/app/plugins/widgets
mkdir my-widget
cd my-widget
```

### Step 2: Create Model File (`my-widget.model.ts`)

Define TypeScript interfaces for your widget data:

```typescript
import { BaseWidget } from '../core/widget-models';

// Main widget interface
export interface MyWidget extends BaseWidget {
  type: 'my-widget';
  title: string;
  items: MyWidgetItem[];
  variant?: 'default' | 'compact';
}

// Sub-interfaces for nested data
export interface MyWidgetItem {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

// Event data interface (if interactive)
export interface MyWidgetActionData {
  itemId: string;
  itemLabel: string;
}
```

**Key Points:**
- Extend `BaseWidget` to get the `type` field
- Use specific literal type for `type` field (e.g., `'my-widget'`)
- Mark optional fields with `?`
- Create sub-interfaces for nested objects

### Step 3: Update Central Types (`core/widget-models.ts`)

Add your widget to the central type system:

```typescript
// 1. Add widget type to WidgetType union (line ~6)
export type WidgetType = 'pricing-cards' | 'form' | 'my-widget' | ...;

// 2. Add to WidgetActionEvent type if interactive (line ~14)
export interface WidgetActionEvent {
  type: 'pricing-card-click' | 'form-submit' | 'my-widget-action' | ...;
  data: any;
}

// 3. Add barrel export (line ~20)
export * from '../my-widget/my-widget.model';

// 4. Add to Widget union type (line ~40)
export type Widget = PricingCardsWidget | FormWidget | MyWidget | ...;
```

### Step 4: Create Component File (`my-widget.component.ts`)

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWidget, MyWidgetActionData } from './my-widget.model';
import { WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-my-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-widget.component.html',
  styleUrls: ['./my-widget.component.scss']
})
export class MyWidgetComponent {
  @Input() widget!: MyWidget;
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  onItemClick(item: any): void {
    this.widgetAction.emit({
      type: 'my-widget-action',
      data: {
        itemId: item.id,
        itemLabel: item.label
      } as MyWidgetActionData
    });
  }
}
```

**Key Points:**
- Use standalone component (Angular 19)
- `@Input() widget` receives data from parent
- `@Output() widgetAction` emits user interactions
- Import CommonModule for basic directives (*ngIf, *ngFor)

### Step 5: Create Template (`my-widget.component.html`)

```html
<div class="widget-root my-widget" [class.compact]="widget.variant === 'compact'">

  <!-- Title -->
  <h3 *ngIf="widget.title" class="my-widget__title">
    {{ widget.title }}
  </h3>

  <!-- Items -->
  <div class="my-widget__items">
    <div *ngFor="let item of widget.items"
         class="my-widget__item"
         (click)="onItemClick(item)">

      <span *ngIf="item.icon" class="my-widget__icon">
        {{ item.icon }}
      </span>

      <span class="my-widget__label">
        {{ item.label }}
      </span>

      <span class="my-widget__value">
        {{ item.value }}
      </span>
    </div>
  </div>
</div>
```

**Key Points:**
- Use BEM naming: `my-widget__element--modifier`
- Apply `.widget-root` class to root element for theme support
- Use Angular directives for conditional rendering and loops
- Bind click handlers to emit events

### Step 6: Create Styles (`my-widget.component.scss`)

```scss
@import '../core/widget-base.scss';

.my-widget {
  // Use CSS custom properties from widget-base.scss
  background: var(--widget-background);
  border: 1px solid var(--widget-border);
  border-radius: var(--widget-radius);
  padding: var(--widget-spacing-md);

  &__title {
    color: var(--widget-foreground);
    font-size: var(--widget-font-size-lg);
    font-weight: 600;
    margin-bottom: var(--widget-spacing-md);
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: var(--widget-spacing-sm);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--widget-spacing-sm);
    padding: var(--widget-spacing-sm);
    border-radius: var(--widget-radius-sm);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: var(--widget-muted);
    }
  }

  &__icon {
    font-size: var(--widget-font-size-xl);
  }

  &__label {
    flex: 1;
    color: var(--widget-foreground);
  }

  &__value {
    color: var(--widget-muted-foreground);
    font-size: var(--widget-font-size-sm);
  }

  // Compact variant
  &.compact {
    .my-widget__item {
      padding: var(--widget-spacing-xs);
    }
  }
}
```

**Available CSS Variables** (from `widget-base.scss`):
- Colors: `--widget-background`, `--widget-foreground`, `--widget-primary`, `--widget-border`, `--widget-muted`, `--widget-muted-foreground`
- Spacing: `--widget-spacing-xs`, `--widget-spacing-sm`, `--widget-spacing-md`, `--widget-spacing-lg`
- Typography: `--widget-font-size-sm`, `--widget-font-size-md`, `--widget-font-size-lg`
- Borders: `--widget-radius`, `--widget-radius-sm`, `--widget-radius-lg`

### Step 7: Register in Widget Renderer

Update `core/widget-renderer.component.ts`:

```typescript
// 1. Import component
import { MyWidgetComponent } from '../my-widget/my-widget.component';

// 2. Add to imports array (line ~25)
imports: [
  CommonModule,
  PricingCardsComponent,
  MyWidgetComponent, // ADD THIS
  // ... other components
]
```

Update `core/widget-renderer.component.html`:

```html
<!-- Add new widget type case -->
<ng-container [ngSwitch]="widget.type">

  <!-- Existing cases -->
  <app-pricing-cards-widget *ngSwitchCase="'pricing-cards'"
    [widget]="$any(widget)"
    (widgetAction)="onWidgetAction($event)">
  </app-pricing-cards-widget>

  <!-- ADD THIS -->
  <app-my-widget *ngSwitchCase="'my-widget'"
    [widget]="$any(widget)"
    (widgetAction)="onWidgetAction($event)">
  </app-my-widget>

  <!-- ... other cases -->
</ng-container>
```

### Step 8: Handle Events (Optional)

If your widget emits events, update `custom-chat-panel.component.ts`:

```typescript
// Find handleWidgetAction method (line ~291)
handleWidgetAction(event: WidgetActionEvent) {
  let formattedMessage = '';

  switch (event.type) {
    // Existing cases...

    case 'my-widget-action': {
      const data = event.data as MyWidgetActionData;
      formattedMessage = `Selected: **${data.itemLabel}** (ID: ${data.itemId})`;
      break;
    }
  }

  // Send formatted message to chat
  this.sendMessageToAgent(formattedMessage);
}
```

### Step 9: Add Demo Data (Optional)

Update `widget-demo-data.ts` to showcase your widget:

```typescript
export const WIDGET_DEMO_MESSAGES = [
  // ... existing demos

  // My Widget Demo
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'my-widget',
      title: 'My Widget Demo',
      items: [
        { id: 'item1', label: 'First Item', value: 'Value 1', icon: '🎯' },
        { id: 'item2', label: 'Second Item', value: 'Value 2', icon: '🚀' }
      ],
      variant: 'default'
    })
  }
];
```

### Step 10: Test Your Widget

```bash
# Build and run
npm start

# In the UI:
# 1. Click "Demo" button to see your widget in demo mode
# 2. Test interactions (clicks, form submissions)
# 3. Check event handling in browser console
# 4. Toggle dark mode to verify theme support
```

---

## Event Handling System

### Overview

Only 4 out of 13 widgets are interactive (emit events):
- **Pricing Cards** - User selects a plan
- **Forms** - User submits form data
- **Quick Links** - User clicks action button
- **Popups** - User opens/closes modal

The remaining 9 widgets are **passive** (display-only).

### Event Flow

```
Widget Component
    ↓ @Output() widgetAction.emit({ type, data })
WidgetRendererComponent
    ↓ (widgetAction)="onWidgetAction($event)"
    ↓ Bubbles event up
CustomChatPanelComponent
    ↓ handleWidgetAction(event: WidgetActionEvent)
    ↓ Formats message based on event.type
    ↓ sendMessageToAgent(formattedMessage)
Backend receives formatted user message
```

### Event Type Definitions

From [widget-models.ts:12-16](core/widget-models.ts):

```typescript
export interface WidgetActionEvent {
  type: 'pricing-card-click' | 'form-submit' | 'quick-link-click' |
        'popup-open' | 'popup-close' | 'card-click' | 'alert-action' |
        'accordion-toggle' | 'rating-change';
  data: any; // Type-specific data (PricingCardClickData, FormSubmitData, etc.)
}
```

### Example: Pricing Card Event

**User clicks "Choose Plan" button:**

```typescript
// pricing-cards.component.ts
onPricingCardClick(event: Event, card: PricingCard): void {
  event.preventDefault();
  this.widgetAction.emit({
    type: 'pricing-card-click',
    data: {
      card: card,
      ctaText: card.cta.text
    }
  });
}
```

**Backend receives:**
```
I'd like to select the **Premium** plan at $29.99/mo. (Plan ID: premium_001)
```

### Example: Form Event

**User submits form:**

```typescript
// form-widget.component.ts
onSubmit(): void {
  this.widgetAction.emit({
    type: 'form-submit',
    data: {
      title: this.widget.title,
      fields: this.formData // { name: 'John', email: 'john@example.com' }
    }
  });
}
```

**Backend receives:**
```
**Contact Form**

**Name:** John Doe
**Email:** john@example.com
**Message:** I'd like to learn more
```

### Making Passive Widgets Interactive

To add event handling to passive widgets (e.g., accordion, rating, card-grid):

1. **Define event data interface** in widget's `.model.ts`:
```typescript
export interface AccordionToggleData {
  itemId: string;
  itemTitle: string;
  expanded: boolean;
}
```

2. **Add event type** to `WidgetActionEvent` in `widget-models.ts`:
```typescript
export interface WidgetActionEvent {
  type: 'accordion-toggle' | ...; // ADD THIS
  data: any;
}
```

3. **Emit event** in widget component:
```typescript
onItemToggle(item: AccordionItem): void {
  item.expanded = !item.expanded;
  this.widgetAction.emit({
    type: 'accordion-toggle',
    data: {
      itemId: item.id,
      itemTitle: item.title,
      expanded: item.expanded
    } as AccordionToggleData
  });
}
```

4. **Handle event** in `custom-chat-panel.component.ts`:
```typescript
case 'accordion-toggle': {
  const data = event.data as AccordionToggleData;
  formattedMessage = `${data.expanded ? 'Opened' : 'Closed'}: ${data.itemTitle}`;
  break;
}
```

---

## Demo Mode

### What is Demo Mode?

Demo mode loads 20+ pre-built messages showcasing all 13 widget types with realistic examples. Perfect for:
- Testing widgets without backend
- Demonstrating capabilities to stakeholders
- Visual regression testing
- Learning widget JSON structure

### How to Use

1. Click the **"Demo"** button in the top-left corner of the chat panel
2. Original messages are saved and restored when you exit demo mode
3. Demo button turns blue when active
4. Click "Demo" again to restore original messages

### Demo Data

All demo messages are defined in [widget-demo-data.ts](widget-demo-data.ts).

**Includes examples of:**
- Pricing cards (standard, featured, tabbed, discounted)
- Forms (all field types, validation, compact layout)
- Quick links (grid, column, card layouts)
- Popups with nested widgets
- Containers combining multiple widgets
- Tables (striped, bordered, aligned columns)
- Alerts (info, success, warning, error)
- Progress tracking (vertical, horizontal)
- Card grids (products, content)
- Accordion FAQs
- Timeline tracking
- Carousel galleries
- Star ratings

### Adding to Demo

```typescript
// widget-demo-data.ts
export const WIDGET_DEMO_MESSAGES = [
  // ... existing demos

  // Your new widget demo
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'my-widget',
      title: 'Demo Title',
      items: [...]
    })
  }
];
```

---

## Advanced Topics

### Recursive Widgets

**Container** and **Popup** widgets support nesting any widget type:

```json
{
  "type": "popup",
  "trigger": { "text": "View Services" },
  "content": {
    "type": "container",
    "layout": "vertical",
    "widgets": [
      { "type": "text", "content": "<h2>Our Services</h2>" },
      { "type": "pricing-cards", "cards": [...] },
      { "type": "form", "fields": [...] }
    ]
  }
}
```

**Implementation:**
- Container and popup components use `forwardRef(() => WidgetRendererComponent)` to avoid circular dependency
- WidgetRendererComponent recursively renders nested widgets
- Events bubble up through all nesting levels

### Theme Support

All widgets automatically adapt to light/dark themes via CSS custom properties.

**How it works:**
1. Angular Material theme defines HSL color values
2. `widget-base.scss` maps theme colors to CSS variables:
   ```scss
   .widget-root {
     --widget-background: hsl(var(--background));
     --widget-foreground: hsl(var(--foreground));
     --widget-primary: hsl(var(--primary));
     // ... more variables
   }
   ```
3. Individual widgets use `var(--widget-*)` for all colors
4. Theme toggle updates HSL values, widgets automatically update

**Testing themes:**
1. Click theme toggle in app header
2. Verify all widgets look correct in both modes
3. Check contrast ratios for accessibility

### Type Safety

The widget system uses TypeScript discriminated unions for type safety:

```typescript
// widget-models.ts
export type Widget =
  | PricingCardsWidget
  | FormWidget
  | QuickLinksWidget
  | ... // All widget types

// Each widget has unique 'type' field
export interface PricingCardsWidget extends BaseWidget {
  type: 'pricing-cards'; // Literal type
  columns: 1 | 2 | 3 | 4 | 5;
  cards: PricingCard[];
}

// TypeScript can narrow types based on 'type' field
function renderWidget(widget: Widget) {
  if (widget.type === 'pricing-cards') {
    // TypeScript knows widget is PricingCardsWidget
    console.log(widget.columns); // ✓ Type-safe
  }
}
```

### Validation

Widgets are validated before rendering:

```typescript
// custom-chat-panel.component.ts
function isWidgetMessage(content: string): boolean {
  try {
    const parsed = JSON.parse(content);
    return parsed && typeof parsed === 'object' && 'type' in parsed;
  } catch {
    return false;
  }
}
```

Invalid widgets fall back to regular text/HTML rendering.

### Performance Optimization

1. **OnPush Change Detection**: Widget components use `ChangeDetectionStrategy.OnPush` for better performance
2. **Lazy Loading**: Widgets are only rendered when visible in viewport (Angular's built-in optimization)
3. **JSON Size**: Widgets typically use 60-80% less data than equivalent HTML
4. **Sanitization**: Only text widget uses DomSanitizer (performance cost), others use safe bindings

### Security

1. **HTML Sanitization**: Text widget content is sanitized via Angular's DomSanitizer
2. **No XSS Risk**: Structured JSON prevents script injection
3. **Type Validation**: Backend should validate widget JSON against schemas
4. **Safe Bindings**: Template uses `{{ }}` interpolation (auto-escaped) instead of `[innerHTML]`

---

## File Reference

| File | Purpose | Lines |
|------|---------|-------|
| `core/widget-models.ts` | Central type definitions, barrel exports | 98 |
| `core/widget-renderer.component.ts` | Main rendering orchestrator | 45 |
| `core/widget-renderer.component.html` | Template with type switching | 120 |
| `core/widget-base.scss` | Shared CSS variables & utilities | 656 |
| `widget-demo-data.ts` | Demo mode data (20+ examples) | 800+ |
| `pricing-cards/pricing-cards.component.ts` | Pricing card logic | 76 |
| `pricing-cards/pricing-cards.component.html` | Pricing card template | 145 |
| `pricing-cards/pricing-cards.component.scss` | Pricing card styles | 280 |
| `pricing-cards/pricing-cards.model.ts` | Pricing card types | 58 |
| (Similar structure for 13 other widgets) | | |

---

## Best Practices

1. **Keep JSON Clean**: Minimize unnecessary fields, use defaults
2. **Use IDs**: Include unique identifiers for tracking selections
3. **Provide Context**: Use descriptions and helper text
4. **Test Both Themes**: Verify light and dark mode rendering
5. **Handle Errors**: Backend should validate JSON and handle malformed data gracefully
6. **Progressive Enhancement**: Use widgets where they add value, plain text otherwise
7. **Responsive Design**: Test on mobile, tablet, and desktop viewports
8. **Accessibility**: Include ARIA labels, keyboard navigation, screen reader support
9. **Consistent Naming**: Follow BEM methodology for CSS classes
10. **Type Everything**: Define TypeScript interfaces for all data structures

---

## Troubleshooting

**Widget not rendering?**
- ✓ Check JSON validity (use online JSON validator)
- ✓ Verify `type` field matches one of 14 widget types
- ✓ Check browser console for parsing errors
- ✓ Ensure backend sends widget as string in `text` field

**Styles look wrong?**
- ✓ Clear browser cache and hard reload
- ✓ Check theme toggle is working
- ✓ Verify `npm start` compiled SCSS files
- ✓ Inspect element in DevTools to check CSS variables

**Events not working?**
- ✓ Check widget component has `@Output() widgetAction`
- ✓ Verify `handleWidgetAction()` includes your event type
- ✓ Check browser console for JavaScript errors
- ✓ Ensure form fields have unique `name` attributes

**Circular dependency error?**
- ✓ Use `forwardRef(() => WidgetRendererComponent)` for recursive widgets
- ✓ Check imports in component file
- ✓ Restart dev server after fixing

**TypeScript errors?**
- ✓ Update `widget-models.ts` with new widget type
- ✓ Add to `WidgetType` union
- ✓ Add to `Widget` union type
- ✓ Run `npx tsc --noEmit` to check types

---

## Migration Guide

### From HTML to JSON Widgets

**Before:**
```python
message = {
    "text": """
    <div class="pricing-card">
      <h3>Basic Plan</h3>
      <div class="price">$9.99/mo</div>
    </div>
    """
}
```

**After:**
```python
widget = {
    "type": "pricing-cards",
    "cards": [{
        "title": "Basic Plan",
        "price": {"currency": "$", "amount": "9.99", "period": "/mo"}
    }]
}
message = {"text": json.dumps(widget)}
```

**Benefits:**
- 60-80% smaller payload
- Type-safe backend validation
- No XSS/injection risks
- Consistent styling
- Interactive events

---

## Additional Resources

- [Angular 19 Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [BEM Methodology](http://getbem.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Angular Material Design](https://material.angular.io/)

---

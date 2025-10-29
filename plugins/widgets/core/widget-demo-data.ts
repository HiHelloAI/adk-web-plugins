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

/**
 * Demo chat conversation showcasing all widget types
 * Enable with: ?widgetDemo=true
 */

export const WIDGET_DEMO_MESSAGES = [
  // Message 1: Welcome
  {
    role: 'bot',
    text: '<h2>Welcome to ADK Widgets Demo!</h2><p>This demo showcases all available widget types with interactive examples. Try clicking the buttons, submitting forms, and exploring nested widgets.</p>',
    eventId: 'demo-1'
  },

  // Message 2: Standard Pricing Cards
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'pricing-cards',
      columns: 3,
      cards: [
        {
          id: 'plan_001',
          title: 'Connect 150',
          description: '150 Mbps download speed, suitable for light browsing, email, and social media.',
          price: {
            currency: '$',
            amount: '19.99',
            period: '/mo'
          },
          features: [
            { text: 'Great for 1-2 people', enabled: true },
            { text: '1.2 TB data included', enabled: true },
            { text: 'Free standard router', enabled: true }
          ],
          cta: {
            text: 'Choose Plan',
            action: 'add_to_cart'
          },
          featured: false
        },
        {
          id: 'plan_002',
          title: 'Fast 500',
          badge: 'Best for Value',
          description: '500 Mbps download speed, unlimited data, suitable for streaming, gaming, and work-from-home.',
          price: {
            currency: '$',
            amount: '49.99',
            period: '/mo'
          },
          features: [
            { text: 'Great for 3-5 people', enabled: true },
            { text: 'Unlimited data included', enabled: true },
            { text: 'Free advanced router', enabled: true },
            { text: 'Includes Peacock and Netflix', enabled: true }
          ],
          cta: {
            text: 'Choose Plan',
            action: 'add_to_cart'
          },
          featured: true,
          colorful: true
        },
        {
          id: 'plan_003',
          title: 'Ultra 1000',
          description: '1000 Mbps download speed, perfect for large households and businesses.',
          price: {
            currency: '$',
            amount: '79.99',
            period: '/mo'
          },
          features: [
            { text: 'Great for 5+ people', enabled: true },
            { text: 'Unlimited data included', enabled: true },
            { text: 'Free WiFi 6 router', enabled: true },
            { text: 'Premium streaming bundle', enabled: true },
            { text: 'Priority customer support', enabled: true }
          ],
          cta: {
            text: 'Choose Plan',
            action: 'add_to_cart'
          },
          featured: false
        }
      ]
    }),
    eventId: 'demo-2'
  },

  // Message 3: Tabbed Pricing Cards
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'pricing-cards',
      columns: 2,
      tabs: [
        {
          id: 'monthly',
          label: 'Monthly Plans',
          cards: [
            {
              id: 'basic_monthly',
              title: 'Basic',
              price: {
                currency: '$',
                amount: '9.99',
                period: '/mo'
              },
              features: [
                { text: '10 Projects', enabled: true },
                { text: '5 GB Storage', enabled: true },
                { text: 'Basic Support', enabled: true },
                { text: 'Advanced Analytics', enabled: false }
              ],
              cta: { text: 'Start Free Trial' }
            },
            {
              id: 'pro_monthly',
              title: 'Pro',
              badge: 'Most Popular',
              featured: true,
              price: {
                currency: '$',
                amount: '29.99',
                period: '/mo'
              },
              features: [
                { text: 'Unlimited Projects', enabled: true },
                { text: '50 GB Storage', enabled: true },
                { text: 'Priority Support', enabled: true },
                { text: 'Advanced Analytics', enabled: true }
              ],
              cta: { text: 'Start Free Trial' }
            }
          ]
        },
        {
          id: 'yearly',
          label: 'Yearly Plans (Save 20%)',
          cards: [
            {
              id: 'basic_yearly',
              title: 'Basic',
              price: {
                currency: '$',
                amount: '99.99',
                period: '/year',
                originalAmount: '119.99',
                discountBadge: 'Save 20%'
              },
              features: [
                { text: '10 Projects', enabled: true },
                { text: '5 GB Storage', enabled: true },
                { text: 'Basic Support', enabled: true },
                { text: 'Advanced Analytics', enabled: false }
              ],
              cta: { text: 'Subscribe Now' }
            },
            {
              id: 'pro_yearly',
              title: 'Pro',
              badge: 'Best Value',
              featured: true,
              colorful: true,
              price: {
                currency: '$',
                amount: '299.99',
                period: '/year',
                originalAmount: '359.99',
                discountBadge: 'Save 20%'
              },
              features: [
                { text: 'Unlimited Projects', enabled: true },
                { text: '50 GB Storage', enabled: true },
                { text: 'Priority Support', enabled: true },
                { text: 'Advanced Analytics', enabled: true }
              ],
              cta: { text: 'Subscribe Now' }
            }
          ]
        }
      ]
    }),
    eventId: 'demo-3'
  },

  // Message 4: Contact Form
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'form',
      title: 'Contact Us',
      description: 'Please fill out the form below and we\'ll get back to you within 24 hours.',
      fields: [
        {
          type: 'text',
          name: 'fullName',
          label: 'Full Name',
          required: true,
          placeholder: 'Enter your full name'
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'your@email.com',
          helperText: 'We\'ll never share your email with anyone else'
        },
        {
          type: 'select',
          name: 'topic',
          label: 'Topic',
          placeholder: 'Select a topic...',
          options: [
            { value: 'sales', label: 'Sales Inquiry' },
            { value: 'support', label: 'Technical Support' },
            { value: 'feedback', label: 'General Feedback' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          type: 'textarea',
          name: 'message',
          label: 'Message',
          required: true,
          placeholder: 'Tell us how we can help...'
        }
      ],
      submitText: 'Send Message',
      actionsAlign: 'right'
    }),
    eventId: 'demo-4'
  },

  // Message 5: Quick Links (Grid Layout)
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'quick-links',
      layout: 'grid',
      links: [
        { text: 'View Account', icon: '👤', variant: 'default' },
        { text: 'Check Balance', icon: '💰', variant: 'primary' },
        { text: 'Pay Bill', icon: '💳', variant: 'success' },
        { text: 'Contact Support', icon: '📞', variant: 'default' }
      ]
    }),
    eventId: 'demo-5'
  },

  // Message 6: Quick Links with Icons and Descriptions
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'quick-links',
      layout: 'column',
      withIcons: true,
      card: {
        title: 'Popular Actions',
        description: 'Choose an action to get started'
      },
      links: [
        {
          text: 'View Account Details',
          icon: '📊',
          description: 'Check your account information, usage, and billing history'
        },
        {
          text: 'Upgrade Your Plan',
          icon: '⬆️',
          description: 'Explore faster speeds and premium features'
        },
        {
          text: 'Technical Support',
          icon: '🛠️',
          description: 'Get help with installation, troubleshooting, and more'
        }
      ]
    }),
    eventId: 'demo-6'
  },

  // Message 7: Form with Radio Buttons and Checkboxes
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'form',
      title: 'Service Request',
      description: 'Tell us about your project needs',
      layout: 'wide',
      fields: [
        {
          type: 'text',
          name: 'company',
          label: 'Company Name',
          required: true,
          placeholder: 'Your Company'
        },
        {
          type: 'select',
          name: 'budget',
          label: 'Project Budget',
          required: true,
          placeholder: 'Select budget range...',
          options: [
            { value: 'under-5k', label: 'Under $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k-25k', label: '$10,000 - $25,000' },
            { value: 'over-25k', label: 'Over $25,000' }
          ]
        },
        {
          type: 'radio',
          name: 'timeline',
          label: 'Project Timeline',
          options: [
            { value: 'urgent', label: 'Urgent (1-2 weeks)' },
            { value: 'normal', label: 'Normal (1-2 months)' },
            { value: 'flexible', label: 'Flexible (3+ months)' }
          ]
        },
        {
          type: 'checkbox',
          name: 'services',
          label: 'Additional Services',
          options: [
            { value: 'maintenance', label: 'Ongoing Maintenance' },
            { value: 'training', label: 'Staff Training' },
            { value: 'analytics', label: 'Analytics Setup' }
          ]
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Project Description',
          placeholder: 'Describe your project...'
        }
      ],
      submitText: 'Submit Request',
      cancelText: 'Cancel',
      actionsAlign: 'right'
    }),
    eventId: 'demo-7'
  },

  // Message 8: Quick Link Variants (All Sizes and Colors)
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'quick-links',
      layout: 'center',
      links: [
        { text: 'Small Link', size: 'small', variant: 'default' },
        { text: 'Default Link', size: 'default', variant: 'primary' },
        { text: 'Large Link', size: 'large', variant: 'success' },
        { text: 'Warning Link', size: 'default', variant: 'warning' }
      ]
    }),
    eventId: 'demo-8'
  },

  // Message 9: Popup with Pricing Cards (Nesting Example)
  {
    role: 'bot',
    text: '<p>Need more details about our plans? Click the button below to see a detailed comparison.</p>',
    eventId: 'demo-9a'
  },
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'popup',
      trigger: {
        text: 'View All Plans',
        icon: '📋',
        style: 'button',
        tooltip: 'Click to see detailed pricing'
      },
      title: 'All Available Plans',
      size: 'large',
      content: {
        type: 'pricing-cards',
        columns: 3,
        cards: [
          {
            title: 'Starter',
            price: { currency: '$', amount: '19.99', period: '/mo' },
            features: [
              { text: '5 Users', enabled: true },
              { text: '10 GB Storage', enabled: true },
              { text: 'Email Support', enabled: true }
            ],
            cta: { text: 'Select Plan' }
          },
          {
            title: 'Business',
            badge: 'Recommended',
            featured: true,
            price: { currency: '$', amount: '49.99', period: '/mo' },
            features: [
              { text: '25 Users', enabled: true },
              { text: '100 GB Storage', enabled: true },
              { text: 'Priority Support', enabled: true }
            ],
            cta: { text: 'Select Plan' }
          },
          {
            title: 'Enterprise',
            price: { currency: '$', amount: '99.99', period: '/mo' },
            features: [
              { text: 'Unlimited Users', enabled: true },
              { text: '1 TB Storage', enabled: true },
              { text: '24/7 Support', enabled: true }
            ],
            cta: { text: 'Contact Sales' }
          }
        ]
      }
    }),
    eventId: 'demo-9b'
  },

  // Message 10: Popup with Form (Another Nesting Example)
  {
    role: 'bot',
    text: '<p>Have questions? Our team is here to help!</p>',
    eventId: 'demo-10a'
  },
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'popup',
      trigger: {
        text: 'Get Help',
        icon: '❓',
        style: 'button'
      },
      title: 'How Can We Help?',
      size: 'medium',
      content: {
        type: 'form',
        title: 'Quick Help Request',
        description: 'Submit your question and we\'ll get back to you',
        fields: [
          {
            type: 'email',
            name: 'email',
            label: 'Your Email',
            required: true,
            placeholder: 'your@email.com'
          },
          {
            type: 'select',
            name: 'category',
            label: 'Question Category',
            placeholder: 'Select category...',
            options: [
              { value: 'billing', label: 'Billing Question' },
              { value: 'technical', label: 'Technical Issue' },
              { value: 'feature', label: 'Feature Request' }
            ]
          },
          {
            type: 'textarea',
            name: 'question',
            label: 'Your Question',
            required: true,
            placeholder: 'How can we help?'
          }
        ],
        submitText: 'Send Question'
      }
    }),
    eventId: 'demo-10b'
  },

  // Message 11: Container with Multiple Widgets
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'container',
      layout: 'vertical',
      widgets: [
        {
          type: 'text',
          content: '<h3>Complete Solution Package</h3><p>Everything you need to get started:</p>'
        },
        {
          type: 'pricing-cards',
          columns: 2,
          layout: 'compact',
          cards: [
            {
              title: 'Core Package',
              price: { currency: '$', amount: '299', period: '' },
              features: [
                { text: 'Complete Setup', enabled: true },
                { text: '30 Days Support', enabled: true }
              ],
              cta: { text: 'Add to Cart' }
            },
            {
              title: 'Premium Package',
              featured: true,
              price: { currency: '$', amount: '499', period: '' },
              features: [
                { text: 'Complete Setup', enabled: true },
                { text: '90 Days Support', enabled: true },
                { text: 'Priority Access', enabled: true }
              ],
              cta: { text: 'Add to Cart' }
            }
          ]
        },
        {
          type: 'quick-links',
          layout: 'center',
          links: [
            { text: 'Learn More', variant: 'default' },
            { text: 'Contact Sales', variant: 'primary' }
          ]
        }
      ]
    }),
    eventId: 'demo-11'
  },

  // Message 12: Complex Nesting (Popup → Container → Multiple Widgets)
  {
    role: 'bot',
    text: '<p>See our complete service offering:</p>',
    eventId: 'demo-12a'
  },
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'popup',
      trigger: {
        text: 'Explore Services',
        icon: '🎯',
        style: 'button'
      },
      title: 'Our Services',
      size: 'fullwidth',
      content: {
        type: 'container',
        layout: 'vertical',
        widgets: [
          {
            type: 'text',
            content: '<h2>Choose Your Service</h2><p>We offer flexible pricing for every need:</p>'
          },
          {
            type: 'pricing-cards',
            columns: 3,
            cards: [
              {
                title: 'Consulting',
                price: { currency: '$', amount: '150', period: '/hour' },
                features: [{ text: 'Expert Guidance', enabled: true }],
                cta: { text: 'Book Now' }
              },
              {
                title: 'Development',
                featured: true,
                price: { currency: '$', amount: '5000', period: '/project' },
                features: [{ text: 'Custom Solutions', enabled: true }],
                cta: { text: 'Get Quote' }
              },
              {
                title: 'Support',
                price: { currency: '$', amount: '99', period: '/mo' },
                features: [{ text: '24/7 Availability', enabled: true }],
                cta: { text: 'Subscribe' }
              }
            ]
          },
          {
            type: 'form',
            title: 'Request Custom Quote',
            description: 'Let us know your specific needs',
            fields: [
              {
                type: 'text',
                name: 'name',
                label: 'Name',
                required: true
              },
              {
                type: 'email',
                name: 'email',
                label: 'Email',
                required: true
              }
            ],
            submitText: 'Get Quote'
          }
        ]
      }
    }),
    eventId: 'demo-12b'
  },

  // Message 13: Compact Pricing Cards
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'pricing-cards',
      columns: 4,
      layout: 'compact',
      cards: [
        {
          title: 'Bronze',
          price: { currency: '$', amount: '9', period: '/mo' },
          features: [{ text: 'Basic Features', enabled: true }],
          cta: { text: 'Select' },
          compact: true
        },
        {
          title: 'Silver',
          price: { currency: '$', amount: '19', period: '/mo' },
          features: [{ text: 'More Features', enabled: true }],
          cta: { text: 'Select' },
          compact: true
        },
        {
          title: 'Gold',
          featured: true,
          price: { currency: '$', amount: '29', period: '/mo' },
          features: [{ text: 'All Features', enabled: true }],
          cta: { text: 'Select' },
          compact: true
        },
        {
          title: 'Platinum',
          price: { currency: '$', amount: '49', period: '/mo' },
          features: [{ text: 'Premium Support', enabled: true }],
          cta: { text: 'Select' },
          compact: true
        }
      ]
    }),
    eventId: 'demo-13'
  },

  // Message 14: Table Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'table',
      title: 'Plan Comparison',
      columns: [
        { key: 'feature', label: 'Feature' },
        { key: 'basic', label: 'Basic', align: 'center' },
        { key: 'pro', label: 'Pro', align: 'center' },
        { key: 'enterprise', label: 'Enterprise', align: 'center' }
      ],
      rows: [
        { feature: 'Storage', basic: '10 GB', pro: '100 GB', enterprise: 'Unlimited' },
        { feature: 'Users', basic: '5', pro: '25', enterprise: 'Unlimited' },
        { feature: 'Support', basic: 'Email', pro: 'Priority', enterprise: '24/7 Phone' },
        { feature: 'Analytics', basic: '✗', pro: '✓', enterprise: '✓' },
        { feature: 'Custom Domain', basic: '✗', pro: '✓', enterprise: '✓' },
        { feature: 'API Access', basic: '✗', pro: '✗', enterprise: '✓' }
      ],
      striped: true,
      bordered: true
    }),
    eventId: 'demo-14'
  },

  // Message 15: Alert Widgets
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'alert',
      variant: 'info',
      icon: 'ℹ️',
      title: 'Information',
      message: 'Your account has been successfully updated with the latest settings.',
      dismissible: true
    }),
    eventId: 'demo-15a'
  },
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'alert',
      variant: 'warning',
      icon: '⚠️',
      title: 'Payment Method Expiring',
      message: 'Your credit card ending in 4242 will expire in 10 days. Please update your payment information.',
      actions: [
        { text: 'Update Now', variant: 'primary' },
        { text: 'Remind Later', variant: 'default' }
      ],
      dismissible: false
    }),
    eventId: 'demo-15b'
  },

  // Message 16: Card Grid Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'card-grid',
      title: 'Featured Products',
      columns: 3,
      cards: [
        {
          id: 'prod1',
          title: 'Premium Laptop',
          description: 'High-performance laptop with latest specs',
          badge: 'New',
          price: '$1,299',
          cta: { text: 'View Details' }
        },
        {
          id: 'prod2',
          title: 'Wireless Headphones',
          description: 'Noise-cancelling with 30hr battery life',
          badge: 'Best Seller',
          price: '$299',
          cta: { text: 'Add to Cart' }
        },
        {
          id: 'prod3',
          title: 'Smart Watch',
          description: 'Fitness tracking and notifications',
          price: '$399',
          cta: { text: 'Learn More' }
        }
      ]
    }),
    eventId: 'demo-16'
  },

  // Message 17: Accordion Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'accordion',
      title: 'Frequently Asked Questions',
      items: [
        {
          id: 'faq1',
          title: 'How do I get started?',
          content: 'Getting started is easy! Simply sign up for an account, choose your plan, and follow our onboarding wizard to set up your first project.',
          icon: '❓',
          expanded: true
        },
        {
          id: 'faq2',
          title: 'What payment methods do you accept?',
          content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
          icon: '💳',
          expanded: false
        },
        {
          id: 'faq3',
          title: 'Can I cancel my subscription anytime?',
          content: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period.',
          icon: '❌',
          expanded: false
        }
      ],
      bordered: true
    }),
    eventId: 'demo-17'
  },

  // Message 18: Timeline Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'timeline',
      title: 'Order Tracking',
      items: [
        {
          date: 'Jan 15, 2025',
          title: 'Order Placed',
          description: 'Your order #12345 was successfully placed',
          status: 'completed',
          icon: '📦'
        },
        {
          date: 'Jan 16, 2025',
          title: 'Processing',
          description: 'Order is being prepared for shipment',
          status: 'completed',
          icon: '⚙️'
        },
        {
          date: 'Jan 17, 2025',
          title: 'Shipped',
          description: 'Package is on its way',
          status: 'in_progress',
          icon: '🚚'
        },
        {
          date: 'Jan 19, 2025',
          title: 'Delivered',
          description: 'Estimated delivery date',
          status: 'pending',
          icon: '✓'
        }
      ]
    }),
    eventId: 'demo-18'
  },

  // Message 19: Rating Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'rating',
      value: 4.5,
      max: 5,
      count: 1284,
      size: 'default',
      showReviews: true
    }),
    eventId: 'demo-19'
  },

  // Message 20: Complex Container with Tabs, Quick Links, and Cards with Images
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'container',
      layout: 'vertical',
      widgets: [
        {
          type: 'text',
          content: '<div style="text-align: center; margin-bottom: 20px;"><h2 style="font-size: 32px; font-weight: 700; margin-bottom: 8px;">🎉 Black Friday Sale</h2><p style="font-size: 16px; color: #666; margin: 0;">Limited time offer - Save up to 40% on all plans!</p></div>'
        },
        {
          type: 'card-grid',
          title: 'Featured Products',
          columns: 3,
          cards: [
            {
              id: 'prod_1',
              image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
              title: 'Premium Laptop Pro',
              description: 'High-performance laptop for professionals',
              badge: 'Best Seller',
              price: '$1,299',
              cta: { text: 'View Details', action: 'view_product' }
            },
            {
              id: 'prod_2',
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
              title: 'Wireless Headphones',
              description: 'Studio-quality sound with noise cancellation',
              badge: 'Sale',
              price: '$199',
              cta: { text: 'Add to Cart', action: 'add_to_cart' }
            },
            {
              id: 'prod_3',
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
              title: 'Smart Watch Elite',
              description: 'Advanced fitness tracking and notifications',
              badge: 'New',
              price: '$349',
              cta: { text: 'Learn More', action: 'view_product' }
            }
          ]
        },
        {
          type: 'pricing-cards',
          title: 'Choose Your Perfect Plan',
          subtitle: 'Flexible pricing that grows with your business. Switch plans anytime.',
          columns: 3,
          tabs: [
            {
              id: 'monthly',
              label: 'Monthly',
              cards: [
                {
                  id: 'starter_monthly',
                  title: 'Starter',
                  description: 'Perfect for individuals',
                  badge: 'Popular',
                  price: {
                    currency: '$',
                    amount: '29',
                    period: '/mo'
                  },
                  features: [
                    { text: '5 Projects', enabled: true },
                    { text: '10 GB Storage', enabled: true },
                    { text: 'Email Support', enabled: true },
                    { text: 'Analytics Dashboard', enabled: false },
                    { text: 'Priority Support', enabled: false }
                  ],
                  cta: { text: 'Get Started', action: 'select_plan' }
                },
                {
                  id: 'pro_monthly',
                  title: 'Professional',
                  description: 'For growing teams',
                  badge: 'Best Value',
                  featured: true,
                  price: {
                    currency: '$',
                    amount: '79',
                    period: '/mo'
                  },
                  features: [
                    { text: 'Unlimited Projects', enabled: true },
                    { text: '100 GB Storage', enabled: true },
                    { text: 'Priority Email Support', enabled: true },
                    { text: 'Analytics Dashboard', enabled: true },
                    { text: 'Priority Support', enabled: false }
                  ],
                  cta: { text: 'Get Started', action: 'select_plan' }
                },
                {
                  id: 'enterprise_monthly',
                  title: 'Enterprise',
                  description: 'For large organizations',
                  price: {
                    currency: '$',
                    amount: '199',
                    period: '/mo'
                  },
                  features: [
                    { text: 'Unlimited Projects', enabled: true },
                    { text: 'Unlimited Storage', enabled: true },
                    { text: '24/7 Phone & Email', enabled: true },
                    { text: 'Analytics Dashboard', enabled: true },
                    { text: 'Dedicated Account Manager', enabled: true }
                  ],
                  cta: { text: 'Contact Sales', action: 'select_plan' }
                }
              ]
            },
            {
              id: 'yearly',
              label: 'Yearly (Save up to 40%)',
              cards: [
                {
                  id: 'starter_yearly',
                  title: 'Starter',
                  description: 'Perfect for individuals',
                  badge: 'Save 31%',
                  price: {
                    currency: '$',
                    amount: '20',
                    period: '/mo',
                    originalAmount: '29',
                    discountBadge: 'Save 31%'
                  },
                  features: [
                    { text: '5 Projects', enabled: true },
                    { text: '10 GB Storage', enabled: true },
                    { text: 'Email Support', enabled: true },
                    { text: 'Analytics Dashboard', enabled: false },
                    { text: 'Priority Support', enabled: false }
                  ],
                  cta: { text: 'Subscribe Yearly', action: 'select_plan' }
                },
                {
                  id: 'pro_yearly',
                  title: 'Professional',
                  description: 'For growing teams',
                  badge: 'Save 40%',
                  featured: true,
                  price: {
                    currency: '$',
                    amount: '47',
                    period: '/mo',
                    originalAmount: '79',
                    discountBadge: 'Save 40%'
                  },
                  features: [
                    { text: 'Unlimited Projects', enabled: true },
                    { text: '100 GB Storage', enabled: true },
                    { text: 'Priority Email Support', enabled: true },
                    { text: 'Analytics Dashboard', enabled: true },
                    { text: 'Priority Support', enabled: false }
                  ],
                  cta: { text: 'Subscribe Yearly', action: 'select_plan' }
                },
                {
                  id: 'enterprise_yearly',
                  title: 'Enterprise',
                  description: 'For large organizations',
                  price: {
                    currency: '$',
                    amount: '139',
                    period: '/mo',
                    originalAmount: '199',
                    discountBadge: 'Save 30%'
                  },
                  features: [
                    { text: 'Unlimited Projects', enabled: true },
                    { text: 'Unlimited Storage', enabled: true },
                    { text: '24/7 Phone & Email', enabled: true },
                    { text: 'Analytics Dashboard', enabled: true },
                    { text: 'Dedicated Account Manager', enabled: true }
                  ],
                  cta: { text: 'Contact Sales', action: 'select_plan' }
                }
              ]
            }
          ]
        },
        {
          type: 'quick-links',
          layout: 'center',
          card: {
            title: 'Need Help Choosing?',
            description: 'Explore our resources or talk to our team'
          },
          links: [
            {
              text: 'Compare Plans',
              icon: '📊',
              variant: 'default',
              description: 'See detailed feature comparison'
            },
            {
              text: 'Talk to Sales',
              icon: '💬',
              variant: 'primary',
              description: 'Get a custom quote'
            },
            {
              text: 'View FAQ',
              icon: '❓',
              variant: 'default',
              description: 'Common questions answered'
            },
            {
              text: 'Start Free Trial',
              icon: '🚀',
              variant: 'success',
              description: 'Try any plan for 14 days'
            }
          ]
        },
        {
          type: 'alert',
          variant: 'info',
          icon: 'ℹ️',
          title: 'Special Offer Ends Soon!',
          message: 'This Black Friday pricing is only available for the next 48 hours. Lock in your savings today!',
          dismissible: false
        }
      ]
    }),
    eventId: 'demo-20'
  },

  // Message 21: Shopping Cart Widget
  {
    role: 'bot',
    text: JSON.stringify({
      type: 'cart',
      title: 'Your Shopping Cart',
      items: [
        {
          id: 'item1',
          name: 'Premium Laptop Pro',
          description: '15.6" Display, 16GB RAM, 512GB SSD',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
          price: 1299.00,
          quantity: 1,
          maxQuantity: 5,
          metadata: {
            'Color': 'Space Gray',
            'Size': '15.6"'
          }
        },
        {
          id: 'item2',
          name: 'Wireless Headphones',
          description: 'Noise-cancelling, 30hr battery',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 199.00,
          quantity: 2,
          maxQuantity: 10,
          metadata: {
            'Color': 'Black'
          }
        },
        {
          id: 'item3',
          name: 'Smart Watch Elite',
          description: 'Advanced fitness tracking',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
          price: 349.00,
          quantity: 1,
          maxQuantity: 3,
          metadata: {
            'Size': '42mm',
            'Band': 'Sport'
          }
        }
      ],
      tax: {
        label: 'Sales Tax',
        percentage: 8.5
      },
      shipping: {
        label: 'Standard Shipping',
        amount: 15.00,
        method: 'USPS Priority Mail',
        estimatedDays: '3-5 business days'
      },
      discount: {
        label: 'Black Friday Discount',
        code: 'FRIDAY2025',
        percentage: 10
      },
      checkoutButton: {
        text: 'Proceed to Checkout',
        icon: '🛒',
        variant: 'primary'
      },
      continueShoppingButton: {
        text: 'Continue Shopping',
        icon: '🛍️',
        variant: 'secondary'
      }
    }),
    eventId: 'demo-21'
  },

  // Message 22: Closing message
  {
    role: 'bot',
    text: '<h3>Complete Demo!</h3><p>You\'ve seen all 14 widget types:</p><ul><li>✅ <strong>Pricing cards</strong> - Plans, subscriptions, discounts</li><li>✅ <strong>Forms</strong> - All input types with validation</li><li>✅ <strong>Quick links</strong> - Action buttons and navigation</li><li>✅ <strong>Popups</strong> - Modal dialogs with nesting</li><li>✅ <strong>Containers</strong> - Widget grouping</li><li>✅ <strong>Tables</strong> - Structured data display</li><li>✅ <strong>Alerts</strong> - Notifications and messages</li><li>✅ <strong>Card Grids</strong> - Product/content browsing</li><li>✅ <strong>Accordions</strong> - Collapsible FAQs</li><li>✅ <strong>Timelines</strong> - Event tracking</li><li>✅ <strong>Carousels</strong> - Image sliders</li><li>✅ <strong>Ratings</strong> - Review display</li><li>✅ <strong>Shopping Cart</strong> - E-commerce cart with calculations</li></ul><p>All widgets are <strong>theme-aware</strong>, <strong>type-safe</strong>, and work in both light and dark modes!</p>',
    eventId: 'demo-22'
  }
];

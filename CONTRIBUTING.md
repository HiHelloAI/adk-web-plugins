# Contributing to ADK Web Plugins

Thank you for your interest in contributing to ADK Web Plugins! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Creating New Widgets](#creating-new-widgets)
- [Testing](#testing)
- [License](#license)

## Code of Conduct

This project follows Google's Open Source Community Guidelines. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/adk-web-plugins.git
   cd adk-web-plugins
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/google/adk-web-plugins.git
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- A local installation of [ADK Web](https://github.com/google/adk-web)
- Basic knowledge of Angular 19+ and TypeScript

### Setting Up Your Development Environment

1. **Clone ADK Web** for testing:
   ```bash
   git clone https://github.com/google/adk-web.git
   cd adk-web
   npm install
   ```

2. **Install plugins** from your fork:
   ```bash
   cd ../adk-web-plugins
   node install-plugin.js ../adk-web
   ```

3. **Run ADK Web** with your changes:
   ```bash
   cd ../adk-web
   npm run serve --backend=http://localhost:8000
   ```

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, Angular version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear use case** for the enhancement
- **Detailed description** of the proposed functionality
- **Examples** of how it would work
- **Potential implementation approach** (optional)

### Pull Requests

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test thoroughly**:
   - Test your changes in a real ADK Web installation
   - Verify all existing widgets still work
   - Test with different data scenarios

4. **Commit your changes**:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Coding Standards

### TypeScript/Angular Guidelines

- **Follow Angular style guide**: Use the [Angular Style Guide](https://angular.io/guide/styleguide)
- **Use TypeScript strict mode**: Ensure type safety
- **Component naming**: Use descriptive names ending with `Component` or `Model`
- **File structure**: Follow the existing pattern (component, model, template, styles)

### Code Style

- **Indentation**: 2 spaces
- **Line length**: Maximum 100 characters
- **Quotes**: Use single quotes for strings
- **Semicolons**: Always use semicolons
- **Imports**: Group and order imports logically

### License Headers

All source files must include the Apache 2.0 license header:

```typescript
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
```

## Creating New Widgets

To create a new widget, follow these steps:

### 1. Create Widget Structure

```bash
plugins/widgets/your-widget/
├── your-widget.component.ts      # Widget component logic
├── your-widget.component.html    # Widget template
├── your-widget.component.scss    # Widget styles
└── your-widget.model.ts          # Data model interface
```

### 2. Define the Model

```typescript
// your-widget.model.ts
export interface YourWidgetModel {
  title: string;
  description: string;
  // Add your properties
}
```

### 3. Create the Component

```typescript
// your-widget.component.ts
import {Component, input} from '@angular/core';
import {YourWidgetModel} from './your-widget.model';

@Component({
  selector: 'app-your-widget',
  standalone: true,
  templateUrl: './your-widget.component.html',
  styleUrl: './your-widget.component.scss',
})
export class YourWidgetComponent {
  data = input.required<YourWidgetModel>();
}
```

### 4. Register the Widget

Add your widget to [widget-models.ts](plugins/widgets/core/widget-models.ts):

```typescript
export type WidgetData =
  | AccordionWidgetModel
  | AlertWidgetModel
  | YourWidgetModel  // Add your model
  // ... other models
  ;

export const WIDGET_TYPE_MAP = {
  accordion: AccordionWidgetComponent,
  alert: AlertWidgetComponent,
  'your-widget': YourWidgetComponent,  // Add your component
  // ... other widgets
};
```

### 5. Add Demo Data

Add example data to [widget-demo-data.ts](plugins/widgets/core/widget-demo-data.ts) for testing.

### 6. Update Documentation

- Add your widget to the README.md widget table
- Document the data structure and use cases
- Provide code examples

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Plugin installs successfully with `install-plugin.js`
- [ ] Verification passes with `verify-plugin.sh`
- [ ] ADK Web builds without errors
- [ ] All existing widgets still render correctly
- [ ] Your new feature/widget works as expected
- [ ] Dark theme styling is consistent
- [ ] Responsive design works on different screen sizes
- [ ] No console errors or warnings

### Testing Your Widget

Create a test agent that returns your widget data:

```python
# Python example
from adk import Agent

class TestAgent(Agent):
    def process(self, user_input: str):
        return {
            "type": "widget",
            "widgetType": "your-widget",
            "data": {
                "title": "Test",
                "description": "Testing your widget"
            }
        }
```

## Submitting Changes

### Pull Request Guidelines

- **One feature per PR**: Keep changes focused and atomic
- **Clear title**: Describe what the PR does
- **Description**: Explain why the change is needed
- **Screenshots**: Include before/after screenshots for UI changes
- **Breaking changes**: Clearly document any breaking changes
- **Documentation**: Update relevant documentation

### PR Template

```markdown
## Description
Brief description of the changes

## Motivation
Why is this change needed?

## Changes Made
- List of specific changes
- Another change

## Testing Done
- [ ] Installed plugins successfully
- [ ] Tested with ADK Web
- [ ] Verified existing functionality

## Screenshots
(if applicable)

## Breaking Changes
(if any)
```

## Review Process

1. **Automated checks**: Ensure all CI checks pass
2. **Code review**: Maintainers will review your code
3. **Address feedback**: Make requested changes
4. **Approval**: Once approved, maintainers will merge

## Community

- **Questions?** Open a GitHub issue
- **Discussions**: Use GitHub Discussions for general questions
- **Security issues**: Report privately via GitHub Security Advisories

## License

By contributing to ADK Web Plugins, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to ADK Web Plugins!

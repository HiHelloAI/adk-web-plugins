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

import {Provider, Type} from '@angular/core';
import {MARKDOWN_COMPONENT} from '../components/markdown/markdown.component.interface';
import {ChatPanelComponent} from '../components/chat-panel/chat-panel.component';
import {CustomChatPanelComponent} from './custom-chat-panel/custom-chat-panel.component';
import {CustomMarkdownComponent} from './custom-chat-panel/custom-markdown.component';

/**
 * Plugin Registry
 *
 * This file auto-registers all plugins by providing component overrides.
 * Add new plugins here to automatically integrate them into the application.
 */

/**
 * Get all plugin providers that should be registered.
 * This function is called during application bootstrap.
 */
export function getPluginProviders(): Provider[] {
  const providers: Provider[] = [];

  // ============================================================================
  // CUSTOM CHAT PANEL PLUGIN
  // ============================================================================
  // Replaces the default ChatPanelComponent with CustomChatPanelComponent
  providers.push({
    provide: ChatPanelComponent,
    useClass: CustomChatPanelComponent,
  });

  // ============================================================================
  // CUSTOM MARKDOWN RENDERER
  // ============================================================================
  // Replaces the default markdown component with custom renderer
  providers.push({
    provide: MARKDOWN_COMPONENT,
    useValue: CustomMarkdownComponent,
  });

  // ============================================================================
  // ADD MORE PLUGINS HERE
  // ============================================================================
  // Example:
  // providers.push({
  //   provide: SomeCoreComponent,
  //   useClass: CustomPluginComponent,
  // });

  // Log registered plugins for debugging
  console.group('🔌 ADK Web Plugins Loaded');
  REGISTERED_PLUGINS.forEach(plugin => {
    console.log(`✓ ${plugin.name} (v${plugin.version})`);
    console.log(`  ${plugin.description}`);
  });
  console.groupEnd();

  return providers;
}

/**
 * Plugin metadata for documentation and debugging (internal use only)
 */
const REGISTERED_PLUGINS = [
  {
    name: 'Custom Chat Panel',
    version: '1.0.0',
    description: 'Enhanced dark theme chat panel with improved UX',
    component: CustomChatPanelComponent,
    replaces: ChatPanelComponent,
  },
  {
    name: 'Custom Markdown Renderer',
    version: '1.0.0',
    description: 'Markdown renderer with ADK marker removal and dark theme styling',
    component: CustomMarkdownComponent,
    replaces: 'MARKDOWN_COMPONENT',
  },
];

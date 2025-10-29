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
 * Plugins Module
 *
 * This module provides a plugin system for ADK Web.
 * All plugins are automatically registered when imported.
 */

export {getPluginProviders} from './plugin-registry';
export {CustomChatPanelComponent} from './custom-chat-panel/custom-chat-panel.component';
export {CustomMarkdownComponent} from './custom-chat-panel/custom-markdown.component';

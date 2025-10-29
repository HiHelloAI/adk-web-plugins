#!/usr/bin/env node

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
 * ADK Web Plugins Installer
 *
 * Installs plugins into an ADK Web project:
 * 1. Copies plugin files to src/app/plugins/
 * 2. Updates main.ts with plugin import
 * 3. Updates styles.scss with widget styles
 * 4. Updates chat.component.ts to use CustomChatPanelComponent
 *
 * Usage: node install-plugin.js <path-to-adk-web>
 */

const fs = require('fs');
const path = require('path');

// Console colors
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const log = (msg, color = c.reset) => console.log(`${color}${msg}${c.reset}`);
const success = (msg) => log(`✓ ${msg}`, c.green);
const info = (msg) => log(`ℹ ${msg}`, c.blue);
const warn = (msg) => log(`⚠ ${msg}`, c.yellow);
const error = (msg) => log(`✗ ${msg}`, c.red);

// Get and validate target directory
const targetDir = path.resolve(process.cwd(), process.argv[2] || '');

if (!process.argv[2]) {
  error('Please provide the path to your adk-web project');
  log('Usage: node install-plugin.js <path-to-adk-web>');
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  error(`Target directory does not exist: ${targetDir}`);
  process.exit(1);
}

const mainTsPath = path.join(targetDir, 'src', 'main.ts');
if (!fs.existsSync(mainTsPath)) {
  error(`main.ts not found at: ${mainTsPath}`);
  error('Make sure you provided the correct path to your adk-web project');
  process.exit(1);
}

log('\n🔌 ADK Web Plugins Installer\n', c.blue);
info(`Target: ${targetDir}`);
info(`Source: ${__dirname}\n`);

// ============================================================================
// STEP 1: Copy Plugin Files
// ============================================================================
info('Step 1: Copying plugin files...');

const pluginsDir = path.join(targetDir, 'src', 'app', 'plugins');

// Backup existing plugins
if (fs.existsSync(pluginsDir)) {
  const backup = `${pluginsDir}.backup.${Date.now()}`;
  fs.renameSync(pluginsDir, backup);
  success(`Backed up existing plugins to: ${backup}`);
}

// Create plugins directory
fs.mkdirSync(pluginsDir, { recursive: true });

// Copy files recursively
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const pluginsSource = path.join(__dirname, 'plugins');
if (fs.existsSync(pluginsSource)) {
  copyDir(pluginsSource, pluginsDir);
  success('Plugin files copied\n');
} else {
  error('plugins/ directory not found');
  process.exit(1);
}

// ============================================================================
// STEP 2: Update main.ts
// ============================================================================
info('Step 2: Updating main.ts...');

let mainTs = fs.readFileSync(mainTsPath, 'utf8');

if (mainTs.includes("from './app/plugins'")) {
  success('main.ts already configured\n');
} else {
  // Backup
  fs.copyFileSync(mainTsPath, `${mainTsPath}.backup.${Date.now()}`);

  // Add import
  const importLine = "import {getPluginProviders} from './app/plugins';";
  const lastAppImport = /import\s+{[^}]+}\s+from\s+['"]\.\/app\/[^'"]+['"];/g;
  const matches = [...mainTs.matchAll(lastAppImport)];

  if (matches.length > 0) {
    const pos = matches[matches.length - 1].index + matches[matches.length - 1][0].length;
    mainTs = mainTs.slice(0, pos) + '\n' + importLine + mainTs.slice(pos);
  }

  // Add to providers
  if (!mainTs.includes('...getPluginProviders()')) {
    mainTs = mainTs.replace(
      /provideAnimations\(\),/,
      'provideAnimations(),\n          {provide: LOCATION_SERVICE, useClass: Location},\n          ...getPluginProviders(),'
    );
  }

  fs.writeFileSync(mainTsPath, mainTs, 'utf8');
  success('main.ts updated\n');
}

// ============================================================================
// STEP 3: Update styles.scss
// ============================================================================
info('Step 3: Updating styles.scss...');

const stylesPath = path.join(targetDir, 'src', 'styles.scss');
let styles = fs.readFileSync(stylesPath, 'utf8');

const widgetImport = './app/plugins/widgets/core/widget-base.scss';

if (styles.includes(widgetImport)) {
  success('styles.scss already configured\n');
} else {
  // Backup
  fs.copyFileSync(stylesPath, `${stylesPath}.backup.${Date.now()}`);

  // Add import after @use statements
  const lastUse = /@use\s+['"][^'"]+['"]\s+as\s+\w+;/g;
  const matches = [...styles.matchAll(lastUse)];

  if (matches.length > 0) {
    const pos = matches[matches.length - 1].index + matches[matches.length - 1][0].length;
    styles = styles.slice(0, pos) + `\n\n@import '${widgetImport}';` + styles.slice(pos);
    fs.writeFileSync(stylesPath, styles, 'utf8');
    success('styles.scss updated\n');
  } else {
    warn('Could not update styles.scss automatically');
    warn(`Please add: @import '${widgetImport}';\n`);
  }
}

// ============================================================================
// STEP 4: Update chat.component.ts
// ============================================================================
info('Step 4: Updating chat.component.ts...');

const chatPath = path.join(targetDir, 'src', 'app', 'components', 'chat', 'chat.component.ts');

if (!fs.existsSync(chatPath)) {
  warn('chat.component.ts not found - skipping\n');
} else {
  let chat = fs.readFileSync(chatPath, 'utf8');

  const hasImport = chat.includes("from '../../plugins/custom-chat-panel/custom-chat-panel.component'");
  const hasInComponentImports = /imports:\s*\[[\s\S]*?CustomChatPanelComponent[\s\S]*?\]/.test(chat);
  const hasViewChild = /viewChild\.required\(CustomChatPanelComponent\)/.test(chat);

  if (hasImport && hasInComponentImports && hasViewChild) {
    success('chat.component.ts already configured\n');
  } else {
    // Backup
    fs.copyFileSync(chatPath, `${chatPath}.backup.${Date.now()}`);

    // Add import
    if (!hasImport) {
      const importLine = "import {CustomChatPanelComponent} from '../../plugins/custom-chat-panel/custom-chat-panel.component';";
      chat = chat.replace(
        /import\s+{ChatPanelComponent}\s+from\s+['"]\.\.\/chat-panel\/chat-panel\.component['"];/,
        (match) => match + '\n' + importLine
      );
      success('✓ Added import');
    }

    // Add to @Component imports array
    if (!hasInComponentImports) {
      // Remove ChatPanelComponent if present (avoid selector conflict)
      chat = chat.replace(/(\s+)ChatPanelComponent,(\s*)(\/\/[^\n]*)?\n/, '');

      // Add CustomChatPanelComponent
      if (/(SidePanelComponent,)(\s+)/.test(chat)) {
        chat = chat.replace(
          /(SidePanelComponent,)(\s+)/,
          '$1$2    CustomChatPanelComponent,  // Plugin replacement$2'
        );
        success('✓ Added to @Component imports');
      } else {
        warn('Could not add to @Component imports array');
      }
    }

    // Update viewChild reference
    if (!hasViewChild) {
      chat = chat.replace(
        /viewChild\.required\(ChatPanelComponent\)/,
        'viewChild.required(CustomChatPanelComponent)'
      );
      success('✓ Updated viewChild reference');
    }

    fs.writeFileSync(chatPath, chat, 'utf8');
    success('chat.component.ts updated\n');
  }
}

// ============================================================================
// Success Message
// ============================================================================
log('\n' + '='.repeat(60), c.green);
success('ADK Web Plugins installed successfully!');
log('='.repeat(60) + '\n', c.green);

info('Next steps:');
log('1. Run: npm install');
log('2. Run: npm run serve --backend=http://localhost:8000');
log('3. Open http://localhost:4200\n');

info('Plugins installed:');
log('  • Custom Chat Panel - Enhanced UI');
log('  • Custom Markdown - ADK marker removal');
log('  • Widget System - 13+ widgets\n');

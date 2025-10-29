#!/bin/bash

###############################################################################
# ADK Web Plugins Verification Script
#
# This script verifies that the plugins are correctly installed in an ADK Web
# project by checking:
# 1. Plugin files exist in src/app/plugins/
# 2. main.ts has the correct import and provider registration
# 3. styles.scss has the widget styles import
#
# Usage:
#   ./verify-plugin.sh <path-to-adk-web>
#
# Example:
#   ./verify-plugin.sh ../adk-web
###############################################################################

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if target directory provided
if [ -z "$1" ]; then
  echo -e "${RED}✗ Please provide the path to your adk-web project${NC}"
  echo "Usage: ./verify-plugin.sh <path-to-adk-web>"
  echo "Example: ./verify-plugin.sh ../adk-web"
  exit 1
fi

TARGET_DIR="$1"

# Resolve to absolute path
TARGET_DIR=$(cd "$TARGET_DIR" 2>/dev/null && pwd)

if [ ! -d "$TARGET_DIR" ]; then
  echo -e "${RED}✗ Target directory does not exist: $TARGET_DIR${NC}"
  exit 1
fi

echo -e "${BLUE}🔍 ADK Web Plugins Verification${NC}\n"
echo -e "${BLUE}ℹ Target directory: $TARGET_DIR${NC}\n"

PLUGINS_DIR="$TARGET_DIR/src/app/plugins"
MAIN_TS="$TARGET_DIR/src/main.ts"
STYLES_SCSS="$TARGET_DIR/src/styles.scss"

ERRORS=0
WARNINGS=0

# Check 1: Plugin files exist
echo -e "${BLUE}Step 1: Checking plugin files...${NC}"

if [ ! -d "$PLUGINS_DIR" ]; then
  echo -e "${RED}✗ Plugins directory not found: $PLUGINS_DIR${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✓ Plugins directory exists${NC}"

  # Check for key files
  if [ -f "$PLUGINS_DIR/index.ts" ]; then
    echo -e "${GREEN}✓ index.ts found${NC}"
  else
    echo -e "${RED}✗ index.ts not found${NC}"
    ERRORS=$((ERRORS + 1))
  fi

  if [ -f "$PLUGINS_DIR/plugin-registry.ts" ]; then
    echo -e "${GREEN}✓ plugin-registry.ts found${NC}"
  else
    echo -e "${RED}✗ plugin-registry.ts not found${NC}"
    ERRORS=$((ERRORS + 1))
  fi

  if [ -d "$PLUGINS_DIR/custom-chat-panel" ]; then
    echo -e "${GREEN}✓ custom-chat-panel plugin found${NC}"
  else
    echo -e "${YELLOW}⚠ custom-chat-panel plugin not found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  if [ -d "$PLUGINS_DIR/widgets" ]; then
    echo -e "${GREEN}✓ widgets directory found${NC}"
    WIDGET_COUNT=$(find "$PLUGINS_DIR/widgets" -maxdepth 1 -type d | wc -l)
    echo -e "${GREEN}  Found $((WIDGET_COUNT - 1)) widget directories${NC}"
  else
    echo -e "${YELLOW}⚠ widgets directory not found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

echo ""

# Check 2: main.ts configuration
echo -e "${BLUE}Step 2: Checking main.ts configuration...${NC}"

if [ ! -f "$MAIN_TS" ]; then
  echo -e "${RED}✗ main.ts not found: $MAIN_TS${NC}"
  ERRORS=$((ERRORS + 1))
else
  # Check for getPluginProviders import
  if grep -q "import.*getPluginProviders.*from.*'\./app/plugins'" "$MAIN_TS" || \
     grep -q 'import.*getPluginProviders.*from.*"./app/plugins"' "$MAIN_TS"; then
    echo -e "${GREEN}✓ getPluginProviders import found${NC}"
  else
    echo -e "${RED}✗ getPluginProviders import not found in main.ts${NC}"
    echo -e "${YELLOW}  Add: import {getPluginProviders} from './app/plugins';${NC}"
    ERRORS=$((ERRORS + 1))
  fi

  # Check for getPluginProviders() call
  if grep -q "\.\.\.getPluginProviders()" "$MAIN_TS"; then
    echo -e "${GREEN}✓ getPluginProviders() call found in providers${NC}"
  else
    echo -e "${RED}✗ getPluginProviders() not called in providers array${NC}"
    echo -e "${YELLOW}  Add: ...getPluginProviders() to the providers array${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

echo ""

# Check 3: styles.scss configuration
echo -e "${BLUE}Step 3: Checking styles.scss configuration...${NC}"

if [ ! -f "$STYLES_SCSS" ]; then
  echo -e "${RED}✗ styles.scss not found: $STYLES_SCSS${NC}"
  ERRORS=$((ERRORS + 1))
else
  # Check for widget-base.scss import (check both old and new paths)
  if grep -q "@import.*plugins/widgets/core/widget-base.scss" "$STYLES_SCSS"; then
    echo -e "${GREEN}✓ widget-base.scss import found${NC}"
  else
    echo -e "${YELLOW}⚠ widget-base.scss import not found in styles.scss${NC}"
    echo -e "${YELLOW}  Add: @import './plugins/widgets/core/widget-base.scss';${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

echo ""

# Summary
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed! Plugins are correctly installed.${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}\n"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠ Verification completed with $WARNINGS warning(s)${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}\n"
  echo -e "${YELLOW}The plugins may work but some optional components are missing.${NC}"
  exit 0
else
  echo -e "${RED}✗ Verification failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}\n"
  echo -e "${RED}Please run the install script to fix the issues:${NC}"
  echo -e "${YELLOW}  node install-plugin.js $TARGET_DIR${NC}\n"
  exit 1
fi

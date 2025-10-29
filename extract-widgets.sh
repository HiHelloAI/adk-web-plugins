#!/bin/bash

###############################################################################
# ADK Web Widget Extraction Script
#
# This script analyzes the adk-web-plugins directory to extract information
# about all available widgets, including their models, components, and usage.
#
# Usage:
#   ./extract-widgets.sh
###############################################################################

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Check if widgets is in plugins subdirectory or root
if [ -d "$SCRIPT_DIR/plugins/widgets" ]; then
  WIDGETS_DIR="$SCRIPT_DIR/plugins/widgets"
else
  WIDGETS_DIR="$SCRIPT_DIR/widgets"
fi

echo -e "${BLUE}🔍 ADK Web Widgets Extraction${NC}\n"

if [ ! -d "$WIDGETS_DIR" ]; then
  echo -e "${RED}✗ Widgets directory not found: $WIDGETS_DIR${NC}"
  exit 1
fi

echo -e "${BLUE}Available Widgets:${NC}\n"
echo "════════════════════════════════════════════════════════════"

# Count widgets
WIDGET_COUNT=0

# Iterate through widget directories
for widget_dir in "$WIDGETS_DIR"/*; do
  if [ -d "$widget_dir" ] && [ "$(basename "$widget_dir")" != "core" ]; then
    WIDGET_NAME=$(basename "$widget_dir")
    WIDGET_COUNT=$((WIDGET_COUNT + 1))

    # Capitalize first letter of widget name
    WIDGET_DISPLAY_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${WIDGET_NAME:0:1})${WIDGET_NAME:1}"
    echo -e "\n${GREEN}$WIDGET_COUNT. $WIDGET_DISPLAY_NAME Widget${NC}"
    echo "   Directory: widgets/$WIDGET_NAME/"

    # Find component file
    COMPONENT_FILE="$widget_dir/${WIDGET_NAME}-widget.component.ts"
    if [ -f "$COMPONENT_FILE" ]; then
      echo -e "   ${BLUE}✓${NC} Component: ${WIDGET_NAME}-widget.component.ts"
    fi

    # Find model file
    MODEL_FILE="$widget_dir/${WIDGET_NAME}.model.ts"
    if [ -f "$MODEL_FILE" ]; then
      echo -e "   ${BLUE}✓${NC} Model: ${WIDGET_NAME}.model.ts"

      # Extract widget type/interface name
      WIDGET_TYPE=$(grep -E "export (interface|type|class) \w+" "$MODEL_FILE" | head -1 | sed -E 's/export (interface|type|class) (\w+).*/\2/')
      if [ ! -z "$WIDGET_TYPE" ]; then
        echo -e "   ${BLUE}✓${NC} Type: $WIDGET_TYPE"
      fi
    fi

    # Find template file
    TEMPLATE_FILE="$widget_dir/${WIDGET_NAME}-widget.component.html"
    if [ -f "$TEMPLATE_FILE" ]; then
      echo -e "   ${BLUE}✓${NC} Template: ${WIDGET_NAME}-widget.component.html"
    fi

    # Find styles file
    STYLES_FILE="$widget_dir/${WIDGET_NAME}-widget.component.scss"
    if [ -f "$STYLES_FILE" ]; then
      echo -e "   ${BLUE}✓${NC} Styles: ${WIDGET_NAME}-widget.component.scss"
    fi

    # Extract description from component if available
    if [ -f "$COMPONENT_FILE" ]; then
      DESCRIPTION=$(grep -A 3 "/\*\*" "$COMPONENT_FILE" | grep -v "^\s*\*\s*$" | grep -v "^\s*/\*\*" | grep -v "^\s*\*/" | head -1 | sed 's/^\s*\*\s*//')
      if [ ! -z "$DESCRIPTION" ]; then
        echo -e "   Description: $DESCRIPTION"
      fi
    fi
  fi
done

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}Total Widgets Found: $WIDGET_COUNT${NC}\n"

# Extract widget registry information
echo -e "${BLUE}Core Files:${NC}"
echo "  • widget-models.ts - Base widget interfaces"
echo "  • widget-renderer.component.ts - Dynamic widget renderer"
echo "  • widget-base.scss - Shared widget styles"
echo "  • widget-demo-data.ts - Demo data for testing"
echo ""

# Check for widget models
WIDGET_MODELS="$WIDGETS_DIR/core/widget-models.ts"
if [ -f "$WIDGET_MODELS" ]; then
  echo -e "${BLUE}Widget Model Types:${NC}"
  grep -E "export (interface|type) \w+Widget" "$WIDGET_MODELS" | sed 's/export interface /  • /' | sed 's/export type /  • /' | sed 's/ {//' | sed 's/extends.*//'
  echo ""
fi

echo -e "${YELLOW}To use these widgets in your ADK agent:${NC}"
echo "  1. Install the plugin: node install-plugin.js ../adk-web"
echo "  2. Import widget models in your Python/Java code"
echo "  3. Return widget data structures from your agent"
echo "  4. The widget-renderer will automatically display them"
echo ""

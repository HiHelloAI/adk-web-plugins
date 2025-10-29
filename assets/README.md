# Assets Directory

This directory contains images and GIFs for the README and documentation.

## Required Assets

Place the following GIF files in this directory:

### Main Demo
- **demo.gif** (800px wide recommended)
  - Shows: Overall plugin functionality, widget rendering, chat interface
  - Duration: 10-15 seconds
  - What to show: Installing, various widgets rendering, user interactions

### Widget-Specific Demos

1. **pricing-cards-demo.gif** (700px wide)
   - Shows: Tabbed pricing cards, switching between monthly/yearly, featured cards
   - Duration: 5-8 seconds

2. **form-demo.gif** (700px wide)
   - Shows: Form widget with various field types, validation, submission
   - Duration: 5-8 seconds

3. **widget-gallery.gif** (700px wide)
   - Shows: Multiple widgets (accordion, alert, table, timeline, etc.)
   - Duration: 10-15 seconds

### Optional Additional Assets

4. **installation-demo.gif**
   - Shows: Running install-plugin.js script, verification

5. **theme-toggle.gif**
   - Shows: Switching between light and dark themes

6. **responsive-demo.gif**
   - Shows: Widgets on different screen sizes

## How to Create GIFs

### Recommended Tools

1. **LICEcap** (Windows/Mac) - Free, simple
   - Download: https://www.cockos.com/licecap/

2. **Kap** (Mac) - Free, high quality
   - Download: https://getkap.co/

3. **ScreenToGif** (Windows) - Free, powerful editor
   - Download: https://www.screentogif.com/

4. **Peek** (Linux) - Simple animated GIF recorder
   - Install: `sudo apt install peek`

### Recording Tips

1. **Resolution**: Keep under 10MB for GitHub
   - Recommended: 700-800px wide
   - FPS: 10-15 (lower file size)

2. **Duration**: Keep short
   - Main demo: 10-15 seconds
   - Feature demos: 5-8 seconds

3. **Content**:
   - Clear, focused on the feature
   - Smooth interactions
   - Show actual functionality, not just screenshots

4. **Optimization**:
   - Use tools like https://ezgif.com/optimize to compress
   - Target: Under 5MB per GIF

## Recording Workflow

### 1. Setup ADK Web with Plugins
```bash
cd /path/to/adk-web
npm run serve
```

### 2. Open Demo Mode
- Click "Demo" button in chat interface
- Shows all 13 widgets with examples

### 3. Record Interactions
- For pricing cards: Switch tabs, hover over cards
- For forms: Fill fields, submit
- For alerts: Show different variants
- For gallery: Scroll through multiple widgets

### 4. Edit & Optimize
- Trim unnecessary frames
- Add text overlays if needed (optional)
- Compress to reduce file size
- Test on GitHub preview

## Placeholder Images

Until you create the GIFs, the README will show:
- Broken image icons (normal for now)
- Alternative text descriptions

To hide them temporarily, comment out the image tags in README.md:
```markdown
<!-- <img src="assets/demo.gif" alt="Demo" width="800"/> -->
```

## Screenshot Alternative

If GIFs are too large, you can use static screenshots:
- **demo.png** - Main interface screenshot
- **pricing-cards.png** - Pricing cards example
- **form.png** - Form widget example
- **widget-grid.png** - Multiple widgets in grid

## File Naming Convention

- Use lowercase and hyphens
- Be descriptive: `pricing-cards-demo.gif` not `demo1.gif`
- Include dimensions in filename if multiple sizes: `demo-800.gif`

## Current Status

- [x] Assets directory created
- [ ] demo.gif (main demo)
- [ ] pricing-cards-demo.gif
- [ ] form-demo.gif
- [ ] widget-gallery.gif

Add your GIF files here and they'll automatically appear in the README!

---

**Note**: All assets should be optimized for web (under 5-10MB) to ensure fast loading on GitHub.

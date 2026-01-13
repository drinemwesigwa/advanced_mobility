# AirMobility Static Website

A modern, responsive static website for AirMobility - Advanced Air Mobility solutions.

## Features

- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Multi-language Support**: English and Arabic (RTL support)
- **Modern Design**: Clean, professional UI with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance Optimized**: Lazy loading, optimized CSS/JS
- **No Frameworks**: Pure HTML, CSS, and JavaScript only

## Structure

```
Mobility/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
└── assets/
    ├── favicon.svg     # Website favicon
    └── hero-image.svg  # Hero section illustration
```

## Running the Website

### Option 1: Python HTTP Server
```bash
cd Mobility
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Option 2: Any Static Server
You can use any static file server:
- Apache
- Nginx
- Node.js `serve` package
- VS Code Live Server extension

## Features Implemented

### Navigation
- Sticky header with scroll effects
- Mobile hamburger menu
- Dropdown menus for navigation items
- Smooth scrolling to sections

### Content Sections
- Hero section with call-to-action
- Statistics showcase
- Network visualization with coverage estimator
- Four main domains (Wings, Space Falcon, VertiHub, Digital Sky)
- Technology showcase
- Call-to-action section
- Comprehensive footer

### Interactivity
- Language switching (EN/AR) with RTL support
- Mobile menu toggle
- Form handling for coverage estimator
- Scroll-based animations
- Keyboard navigation support

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly buttons and links

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

### Colors
Edit CSS custom properties in `:root`:
```css
--primary: #000000;
--background: #ffffff;
--foreground: #0f172a;
```

### Content
Update text in `index.html` and translations in `js/main.js`

### Styling
Modify `css/style.css` for layout and visual changes

## Performance

- CSS minified and optimized
- JavaScript lazy-loaded where possible
- Images in SVG format for crisp display
- Minimal HTTP requests

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- High contrast support
- Reduced motion support

## Development

The website is built with modern web standards:
- HTML5 semantic elements
- CSS Grid and Flexbox
- ES6+ JavaScript
- CSS Custom Properties
- Intersection Observer API

No build tools or frameworks required - just edit the files directly!
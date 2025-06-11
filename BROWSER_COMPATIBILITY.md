# Browser Compatibility Changes

This project has been updated to support older browsers including Safari 14.3 and Chrome 92, which were having styling issues with the original Tailwind CSS v4 setup.

## Changes Made

### 1. Downgraded Dependencies

- **Tailwind CSS**: v4 → v3.4.17 (supports Chrome 64+, Safari 12+)
- **React**: v19 → v18.3.1 (better compatibility)
- **Next.js**: v15.3.3 → v14.2.15 (stable version)
- **Node.js**: v22 → v20 (in GitHub Actions)

### 2. Configuration Updates

- **Tailwind Config**: Converted from v4 `@theme inline` to v3 traditional config
- **CSS Imports**: Changed from `@import "tailwindcss"` to `@tailwind base/components/utilities`
- **PostCSS**: Updated to use traditional Tailwind + Autoprefixer setup
- **Next.js Config**: Converted from TypeScript to JavaScript (required for Next.js 14)

### 3. Font Changes

- Replaced `Geist` fonts with `Inter` and `Noto Serif SC` for better compatibility

### 4. Browser Support

The updated configuration now supports:

**Production Targets:**
- Chrome 64+ (2018)
- Safari 12+ (2018)
- Firefox 67+ (2019)
- Edge 79+ (2020)

**Confirmed Working On:**
- Safari 14.3 (iPhone)
- Chrome 92.0.4515.159 (Android 10)

## Technical Details

### CSS Variables
All CSS variables have been converted from OKLCH color space (v4) to HSL (v3) for better browser support.

### Animations
Custom animations are preserved using the `tailwindcss-animate` plugin, ensuring smooth transitions work across all supported browsers.

### Browserslist Configuration
Added explicit browserslist configuration to package.json to ensure consistent targeting across build tools.

## Deployment

The GitHub Actions workflow has been updated to use Node.js 20 for better compatibility with the downgraded dependencies.

## Future Considerations

When broader browser support for modern CSS features is achieved, the project can be upgraded back to:
- Tailwind CSS v4 (when targeting Chrome 111+, Safari 16.4+)
- React 19 (for latest features)
- Next.js 15+ (for latest optimizations)

For now, this setup ensures the wedding planning website works beautifully across a wide range of devices and browser versions. 
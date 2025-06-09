# 缘份婚庆 - Wedding Showcase Website

A beautiful, mobile-first Chinese wedding company showcase website featuring romantic minimalism design.

## 🌸 Features

- **Romantic Minimalism Design** - Elegant pink and gold color palette
- **Mobile-First Responsive** - Optimized for all devices
- **Interactive Gallery** - Auto-rotating wedding photos with touch support
- **Contact Form** - Real-time validation with Chinese phone number support
- **Smooth Animations** - Petal fall animation and scroll effects
- **WeChat Integration** - One-click WeChat ID copy functionality
- **Accessibility** - WCAG compliant with keyboard navigation
- **Performance Optimized** - Lazy loading and optimized assets

## 🎨 Design System

### Color Palette
- **Primary**: `#e83e8c` (Romantic Pink)
- **Secondary**: `#d4af37` (Luxury Gold)
- **Accent**: `#8e44ad` (Elegant Purple)
- **Light**: `#fff9fb` (Light Pink Background)
- **Dark**: `#4a235a` (Deep Purple Text)

### Typography
- **Headers**: Noto Serif SC (serif)
- **Body**: HarmonyOS Sans SC (sans-serif)
- **Weights**: 300, 400, 600

## 📱 Sections

1. **Fixed Navbar** - Hamburger menu with smooth scrolling
2. **Hero Banner** - Full viewport with floating petal animation
3. **Services** - 4 service cards with hover effects
4. **Gallery** - Auto-rotating slider with touch support
5. **About** - Company story with statistics
6. **Contact Form** - Validation with real-time feedback
7. **Footer** - Company details and legal information
8. **Sticky Contact** - Fixed call button for easy access

## 🚀 Deployment

### GitHub Pages Setup

1. **Repository Settings**
   ```bash
   # Enable GitHub Pages in repository settings
   # Source: Deploy from a branch
   # Branch: main / (root)
   ```

2. **Custom Domain** (Optional)
   - Update `CNAME` file with your domain
   - Configure DNS A records to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **HTTPS Configuration**
   - GitHub Pages automatically provides SSL
   - Enforce HTTPS in repository settings

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/yuanfen-wedding.git

# Navigate to project directory
cd yuanfen-wedding

# Open with live server (VS Code extension) or serve locally
# No build process required - pure HTML/CSS/JS
```

## 🛠️ Technical Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern features including CSS Grid, Flexbox, Custom Properties
- **Vanilla JavaScript** - No frameworks, optimized for performance
- **Google Fonts** - Chinese typography (Noto Serif SC, HarmonyOS Sans SC)

## 📋 File Structure

```
yuanfen-wedding/
├── index.html          # Main HTML file
├── styles.css          # Complete stylesheet
├── script.js           # JavaScript functionality
├── CNAME              # Custom domain configuration
└── README.md          # Project documentation
```

## 🔧 Customization

### Colors
Update CSS custom properties in `styles.css`:
```css
:root {
  --primary: #e83e8c;
  --secondary: #d4af37;
  /* ... other colors */
}
```

### Content
- Edit text content directly in `index.html`
- Replace placeholder images with actual wedding photos
- Update contact information and business details

### Gallery Images
Replace placeholder gradients with actual images:
```html
<div class="gallery-image">
  <img src="path/to/wedding-photo.jpg" alt="Wedding Description">
</div>
```

## 📱 Mobile Optimization

- Viewport units for responsive design
- Touch-friendly interface (min 48px touch targets)
- Hamburger navigation for mobile
- Swipe gestures for gallery
- Optimized font sizes and spacing

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly
- Focus indicators

## 🚀 Performance Features

- CSS custom properties for efficient styling
- Intersection Observer for scroll animations
- Debounced scroll events
- Lazy loading ready (for images)
- Minimal external dependencies

## 📞 Contact Features

- **Phone**: Direct call links (`tel:`)
- **WeChat**: One-click ID copy to clipboard
- **Form**: Client-side validation with Chinese phone regex
- **Sticky Button**: Always-accessible contact option

## 🎯 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## 📈 SEO Optimization

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags ready
- Fast loading times
- Mobile-friendly design

## 🔒 Security Considerations

- No server-side code (static site)
- HTTPS enforced
- No sensitive data storage
- Contact form uses client-side validation only

## 📝 License

This project is created for demonstration purposes. Replace with your actual license.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📮 Support

For support and questions:
- **Email**: support@yuanfen-wedding.com
- **WeChat**: yuanfen_hunqing
- **Phone**: 138-0013-8000

---

*让每一个瞬间都成为永恒 - Making every moment eternal* 
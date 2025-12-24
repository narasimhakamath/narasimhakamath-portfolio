# Portfolio Website - Customization Guide

## 🎨 How to Customize Your Portfolio

### 1. Personal Information

**Hero Section** - Edit `src/components/Hero.jsx`:
- Line 9: Replace "Your Name" with your actual name
- Line 11: Update your job title if different from "Software Engineer"
- Lines 12-14: Write your own personal description

**Contact Section** - Edit `src/components/Contact.jsx`:
- Line 35: Update your email address
- Line 43: Update your phone number
- Line 51: Update your location
- Lines 56-68: Update social media links (GitHub, LinkedIn, Twitter)

### 2. Work Experience

Edit `src/components/Experience.jsx`:
- Lines 6-46: Replace the sample experiences array with your actual work history
- Add/remove experience objects as needed
- Update titles, companies, periods, descriptions, and achievements

### 3. Blog Posts

Edit `src/components/Blog.jsx`:
- Lines 6-57: Replace the sample blog posts with your actual articles
- Update titles, dates, excerpts, tags, and read times
- Each blog post needs: id, title, date, excerpt, tags array, and readTime

### 4. Resume Download

1. Place your resume PDF in the `public/` folder and name it `resume.pdf`
2. Or update the file name in `src/components/Experience.jsx` line 52

### 5. Styling and Colors

**Primary Colors:**
- Purple gradient: `#667eea` to `#764ba2` (Hero section)
- Blue accent: `#3498db` (buttons, links)
- Dark text: `#2c3e50`

To change colors, edit the respective CSS files:
- `src/components/Hero.css` - Hero section gradient
- `src/components/Experience.css` - Experience timeline color
- `src/components/Blog.css` - Blog card styles
- `src/components/Contact.css` - Contact form styles

### 6. Navigation Logo

Edit `src/components/Header.jsx`:
- Line 16: Replace "Portfolio" with your name or brand

## 🚀 Running the Portfolio

```bash
npm start
```

Visit http://localhost:3000 to see your portfolio

## 📦 Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready for deployment.

## 🌐 Deployment Options

- **GitHub Pages**: Free hosting for static sites
- **Vercel**: Automatic deployments from GitHub
- **Netlify**: Easy drag-and-drop deployment
- **AWS S3**: Scalable static website hosting

## 💡 Future Enhancements

Consider adding:
- Skills/Technologies section
- Projects/Portfolio showcase
- Testimonials
- Dark mode toggle
- Animations with Framer Motion
- Real blog integration (with CMS like Contentful or Strapi)
- Contact form backend (EmailJS, Formspree, or custom API)

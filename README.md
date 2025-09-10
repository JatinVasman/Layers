# Layers Clothing

**Timeless Wardrobe. Everyday Power.**

A modern, responsive e-commerce website built with Next.js, featuring a clean design, smooth animations, and a complete shopping experience. From morning coffee runs to late-night hangs, essentials built to move with you.

![Layers Clothing](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-pink?style=for-the-badge&logo=framer)

## 🚀 Features

### 🎨 **Modern Design**
- **Clean, minimalist aesthetic** with focus on typography and whitespace
- **Responsive design** that works perfectly on desktop, tablet, and mobile
- **Smooth animations** powered by Framer Motion
- **Custom scrollbar** with modern styling
- **Interactive elements** with hover effects and transitions

### 🛍️ **E-commerce Functionality**
- **Product catalog** with filtering and sorting capabilities
- **Shopping cart** with add/remove/update functionality
- **Wishlist** for saving favorite items
- **Product pages** with detailed information and image galleries
- **Size guide** and product information pages

### 📱 **Mobile-First Experience**
- **Responsive layouts** optimized for all screen sizes
- **Touch-friendly interactions** for mobile devices
- **Mobile-specific animations** and layouts
- **Optimized images** with Next.js Image component

### ⚡ **Performance & SEO**
- **Next.js 15** with App Router for optimal performance
- **Server-side rendering** for better SEO
- **Image optimization** with automatic WebP conversion
- **Metadata optimization** for social sharing
- **Fast loading** with optimized bundles

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.9
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/layers-clothing.git
   cd layers-clothing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
layers/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── blog/                     # Blog/news pages
│   ├── calder/                   # Calder Co. demo section
│   ├── cart/                     # Shopping cart
│   ├── collection/               # Product collections
│   ├── contact/                  # Contact page
│   ├── product/                  # Individual product pages
│   ├── products/                 # Products listing
│   ├── wishlist/                 # Wishlist page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── site-header.tsx           # Main navigation
│   ├── site-footer.tsx           # Footer
│   ├── product-grid.tsx          # Product display
│   ├── style-it-your-way-scroll.tsx # Hero animation
│   └── ...                       # Other components
├── lib/                          # Utility functions
│   ├── products.ts               # Product data
│   ├── utils.ts                  # Helper functions
│   └── ...                       # Other utilities
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   └── ...                       # Other static files
└── styles/                       # Additional styles
```

## 🎨 Design System

### Typography
- **Hero Text**: 72px (mobile) → 110px (desktop)
- **Section Headings**: 52px
- **Subheadings**: 32px
- **Body Text**: 18px
- **Small Text**: 16px

### Colors
- **Primary Black**: #1a1a1a
- **Background**: #ffffff
- **Card**: #ffffff
- **Muted**: #f5f5f5
- **Border**: #e5e5e5
- **Text**: #1a1a1a

### Spacing
- **Container**: Full width with responsive padding
- **Sections**: 128px vertical padding
- **Grid Gaps**: 24px between items
- **Responsive Breakpoints**: 768px, 1024px, 1280px

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Deploy** with automatic deployments on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Next.js buildpack
- **Railway**: Connect your GitHub repository
- **AWS**: Use Amplify or custom deployment
- **DigitalOcean**: Use App Platform

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Add any environment variables here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Customization

1. **Colors**: Update CSS variables in `app/globals.css`
2. **Typography**: Modify font sizes in the CSS file
3. **Products**: Update product data in `lib/products.ts`
4. **Content**: Edit page content in respective `page.tsx` files

## 📱 Pages & Features

### Homepage
- **Hero section** with animated background
- **Style It Your Way** scroll-triggered animation
- **Everyday Essentials** product showcase
- **Proven Favorites** with hover effects
- **Brand Promises** section

### Product Pages
- **Product listing** with filtering and sorting
- **Individual product pages** with image galleries
- **Shopping cart** functionality
- **Wishlist** management
- **Size guide** and product information

### Other Pages
- **About** - Brand story and values
- **Contact** - Contact form and information
- **Blog/News** - Content and updates
- **Legal** - Terms, privacy, shipping, returns

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Radix UI** for accessible component primitives
- **Vercel** for hosting and deployment

## 📞 Support

For support, email support@layersclothing.com or create an issue in this repository.

---

**Built with ❤️ by the Layers team**

*Timeless Wardrobe. Everyday Power.*
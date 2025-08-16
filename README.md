# Staffly Agency Website

A modern, responsive website for Staffly Agency - connecting world-class Filipino talent with global opportunities through AI-powered matching and unmatched support.

## 🚀 Features

- **Modern Design** - Glass-morphism UI with smooth animations
- **Responsive Layout** - Mobile-first design that works on all devices
- **Interactive Components** - Smooth animations powered by Framer Motion
- **Professional Pages** - Landing, Jobs, Hire, Partner, Services, Contact, and Playbooks
- **Search & Filter** - Advanced playbook search with category filtering
- **Legal Compliance** - Terms of Service and Privacy Policy pages

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **UI Components**: Radix UI (available)

## 📱 Pages

- **Home** (`/`) - Landing page with hero section and partner program
- **Jobs** (`/jobs`) - Job search and virtual assistant listings
- **Hire** (`/hire`) - Client hiring solutions and VA matching
- **Partner** (`/partner`) - Partner program and success stories
- **Services** (`/services`) - Agency services and offerings
- **Playbooks** (`/playbooks`) - Business playbooks with search and filtering
- **Contact** (`/contact`) - Contact form and business information
- **Legal** (`/terms`, `/privacy`) - Terms of Service and Privacy Policy

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Luketomeenow/stafflyagency.git
cd stafflyagency
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:check` - Type check without building
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FloatingNavbar.tsx
│   ├── GlassCard.tsx
│   ├── ShimmerButton.tsx
│   ├── MagneticCard.tsx
│   └── TextReveal.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── JobsPage.tsx
│   ├── HirePage.tsx
│   ├── PartnerPage.tsx
│   ├── ServicesPage.tsx
│   ├── PlaybooksPage.tsx
│   ├── ContactPage.tsx
│   ├── TermsOfServicePage.tsx
│   └── PrivacyPolicyPage.tsx
├── App.tsx             # Main application with routing
└── main.tsx            # Application entry point
```

## 🌐 Deployment

### Netlify Deployment

This project is fully configured for Netlify deployment:

1. **Connect GitHub repository** to Netlify
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables** (if needed)
4. **Deploy!**

### Configuration Files

- **`netlify.toml`** - Main Netlify configuration
- **`public/_redirects`** - SPA routing support
- **`vite.config.ts`** - Optimized build configuration

### Build Optimizations

- **Code splitting** - Vendor, router, and feature chunks
- **Asset optimization** - Image compression and minification
- **TypeScript checking** - Build-time type validation
- **SPA routing** - Proper handling of React Router

## 🔧 Development

### Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript** - Type safety and IntelliSense
- **Prettier** - Code formatting (recommended)

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive Web App ready

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Fast initial load with lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Staffly Agency.

## 🆘 Support

For support and questions:
- **Email**: [Contact through website]
- **Website**: [Your website URL]
- **Documentation**: [If available]

---

**Built with ❤️ by Staffly Agency Team**

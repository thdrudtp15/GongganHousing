# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for "공간하우징" (Gonggan Housing), a Korean construction company website. The project uses TypeScript, Tailwind CSS, and Supabase for backend services.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **TypeScript**: Strict typing throughout
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (with SSR support)
- **Authentication**: NextAuth.js with Supabase adapter
- **Rich Text Editor**: TipTap
- **File Upload**: Cloudinary
- **Maps**: React Kakao Maps SDK
- **Email**: Nodemailer
- **Animations**: Framer Motion

### Project Structure
```
app/                    # Next.js App Router pages
├── about/             # About pages with dynamic routing
├── admin/             # Admin dashboard
├── inquiry/           # Contact/inquiry form
├── location/          # Location page
├── portfolio/         # Portfolio with dynamic routes
└── layout.tsx         # Root layout with Header/Footer

components/            # Reusable React components
├── editor/           # TipTap rich text editor components
├── Auth.tsx          # Authentication components
├── InquiryForm.tsx   # Contact form
└── Map.tsx           # Kakao Maps integration

containers/           # Layout containers (Header, Footer)
lib/                  # Utility libraries
├── supabase/         # Supabase client configuration
├── cloudinary/       # Image upload utilities
└── mail/             # Email service

types/                # TypeScript type definitions
utils/                # General utility functions
```

### Key Features
- **Multi-language Support**: Korean content with proper SEO metadata
- **Rich Content Management**: TipTap editor for admin content creation
- **Image Management**: Cloudinary integration for optimized image handling
- **Authentication**: Secure admin access via NextAuth.js
- **Location Services**: Kakao Maps integration for location display
- **Email Services**: Contact form with Nodemailer integration

### Database Schema
The application uses Supabase with the following key areas:
- Portfolio management (construction projects)
- Content management for dynamic pages
- User authentication and admin access

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Development Notes
- Uses Turbopack for faster development and build times
- App Router with TypeScript for type-safe routing
- Server-side rendering enabled with Supabase SSR
- Font optimization with Inter, Geist Sans, and Geist Mono
- Responsive design with mobile-first approach
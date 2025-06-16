# Arabic Calculator Tools Application

## Overview

This is a full-stack web application that provides various Arabic-language calculator tools for daily use. The application features a collection of utility calculators including age calculator, date converter, BMI calculator, percentage calculator, and more. It's built with a modern tech stack using React for the frontend and Express for the backend, with support for both Arabic (RTL) and responsive design.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript, running on Node.js
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively using a live database yet)
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Deployment**: Configured for Replit with autoscale deployment

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for client-side routing
- **Styling**: Tailwind CSS with custom Arabic font (Cairo) and RTL support
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: Drizzle ORM configured for PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store support
- **Development**: Hot reloading with Vite integration in development mode

### UI Component System
The application uses a comprehensive design system with:
- Consistent theming with CSS custom properties
- Dark/light mode support (configured but not implemented)
- Responsive design patterns
- Accessible components using Radix UI primitives
- Arabic-specific styling with RTL text direction

## Data Flow

### Client-Side Flow
1. User interacts with calculator tools through modal dialogs
2. Form inputs are validated using React Hook Form and Zod schemas
3. Calculations are performed client-side using utility functions
4. Results are displayed immediately without server communication
5. TanStack Query manages any future API calls to the backend

### Server-Side Flow
1. Express server serves the React application in production
2. API routes are prefixed with `/api` for backend functionality
3. Database operations use Drizzle ORM with type-safe queries
4. Session management handles user authentication (when implemented)
5. Error handling middleware processes and formats errors

### Database Schema
Currently defined schema includes:
- **Users table**: Basic user management with username/password
- **Extensible**: Ready for additional calculator data storage
- **Type Safety**: Full TypeScript integration with Drizzle ORM

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form, TanStack Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Backend**: Express.js, session management libraries
- **Development**: Vite, TypeScript, ESBuild

### Calculator-Specific Tools
- **Date Handling**: date-fns for date calculations and formatting
- **Form Validation**: Zod for schema validation
- **UI Enhancements**: Embla Carousel, CMDK for command interfaces

## Deployment Strategy

### Replit Configuration
- **Environment**: Node.js 20, PostgreSQL 16, Web modules
- **Development**: `npm run dev` starts both client and server with hot reloading
- **Production Build**: Vite builds client assets, ESBuild bundles server
- **Port Configuration**: Server runs on port 5000, exposed as port 80
- **Auto-scaling**: Configured for automatic scaling based on demand

### Build Process
1. **Development**: Vite dev server with Express backend integration
2. **Production**: 
   - Client assets built to `dist/public`
   - Server bundled to `dist/index.js`
   - Static assets served by Express in production

### Database Strategy
- **Development**: In-memory storage with MemStorage class
- **Production**: Ready for PostgreSQL with environment-based configuration
- **Migrations**: Drizzle Kit handles schema migrations

## Changelog
- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
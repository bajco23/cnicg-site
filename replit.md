# replit.md

## Overview

This is a bilingual (Montenegrin/English) website for **Centar za nove inicijative** (Center for New Initiatives), a Montenegrin NGO focused on transparency in public policy areas including concessions, public-private partnerships, and public procurement. The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming, supporting light/dark modes via next-themes
- **Typography**: Fraunces (display) and IBM Plex Sans (body) fonts with a premium, minimal aesthetic

### Backend Architecture
- **Framework**: Express 5 running on Node.js with TypeScript (tsx for development)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for input validation and response typing
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - defines database tables with Drizzle's pgTable
- **Migrations**: Managed via drizzle-kit (`db:push` command)
- **Validation**: drizzle-zod generates Zod schemas from database tables

### Project Structure
```
client/           # Frontend React application
├── src/          # React components, pages, hooks
├── *.html        # Static HTML pages (legacy/alternative)
server/           # Backend Express application
├── routes.ts     # API route definitions
├── storage.ts    # Database access layer
├── db.ts         # Database connection
shared/           # Shared code between client/server
├── schema.ts     # Drizzle database schema
├── routes.ts     # API route definitions with Zod schemas
```

### Key Design Decisions

1. **Shared Type Safety**: API routes and schemas are defined in `shared/` to ensure type consistency between frontend and backend. The `api` object in `shared/routes.ts` defines method, path, input schema, and response schemas for each endpoint.

2. **Component Architecture**: Uses a "glass morphism" design with backdrop blur effects, gradient borders, and subtle shadows. The `SiteShell` component provides consistent layout with sidebar navigation.

3. **Static + SPA Hybrid**: The project includes both static HTML files in `client/` and a React SPA in `client/src/`. The React app uses client-side routing while the server can also serve static HTML pages directly.

4. **Development vs Production**: In development, Vite middleware provides HMR. In production, the server serves pre-built static files from `dist/public`.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage in PostgreSQL (available but may not be actively used)

### UI Libraries
- **Radix UI**: Extensive suite of accessible, unstyled components (dialog, dropdown, accordion, etc.)
- **shadcn/ui**: Pre-styled component configurations in `client/src/components/ui/`
- **Lucide React**: Icon library

### Core Libraries
- **Drizzle ORM**: Type-safe database queries and schema management
- **Zod**: Runtime validation for API inputs and outputs
- **TanStack Query**: Async state management for data fetching
- **Embla Carousel**: Carousel component functionality

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server-side bundling for production
- **Tailwind CSS**: Utility-first styling with custom configuration

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)
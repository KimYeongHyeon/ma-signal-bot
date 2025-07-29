# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production 
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Architecture

This is an Ethereum Moving Average crossover alert system built with:

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

### Key Components Structure

- `src/App.tsx` - Main app with routing, query client, and toast providers
- `src/pages/Index.tsx` - Entry point that renders Dashboard
- `src/components/Dashboard.tsx` - Main dashboard layout with hero section and component grid
- `src/components/PriceCard.tsx` - ETH price display with MA indicators
- `src/components/AlertHistory.tsx` - Historical alerts display
- `src/components/AlertSettings.tsx` - Discord webhook and alert configuration
- `src/components/ui/` - shadcn/ui component library
- `src/lib/utils.ts` - Utility functions including cn() for className merging

### Application Flow

The app is a single-page dashboard for monitoring Ethereum moving average crossovers:
1. Hero section displays Korean title and description
2. Grid layout shows current ETH price, moving averages, and alert history
3. Settings section for configuring Discord webhooks and alert preferences
4. Status footer shows system health

### Development Notes

- Uses absolute imports with `@/` alias pointing to `src/`
- Korean language UI text throughout the application
- Mock data currently used - comments indicate future Supabase integration
- Lovable.dev integration for deployment and development
- Custom Tailwind theme with crypto-specific colors (crypto-green)
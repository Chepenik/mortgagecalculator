# Overview

This is a comprehensive mortgage calculator web application built with Next.js that provides users with detailed mortgage payment calculations and financial analysis tools. The app offers both basic mortgage calculations and premium features, including unique Bitcoin-related financial analysis. It's designed as a modern, responsive single-page application with dark/light theme support and interactive data visualizations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses Next.js 14 with TypeScript and follows a component-based architecture. The main structure includes:

- **App Router**: Uses Next.js App Router for routing and page organization
- **Component Library**: Modular React components for inputs, charts, and UI elements
- **State Management**: Local React state with hooks for managing calculator data and user preferences
- **Styling**: Tailwind CSS for responsive design with custom color schemes and dark mode support
- **Icons**: Lucide React and React Icons for consistent iconography

## Data Visualization
The app leverages Recharts library for creating interactive charts including:
- Amortization schedules
- Loan balance tracking
- Payment breakdowns (pie charts)
- Principal vs interest analysis
- Equity buildup visualization

## Theme System
Implements next-themes for seamless dark/light mode switching with custom CSS variables for consistent theming across components.

## Premium Feature Architecture
The application includes a freemium model with:
- Basic calculations available to all users
- Premium overlay system that restricts advanced features
- Trial and subscription management (UI components ready for backend integration)
- Bitcoin integration as a unique premium differentiator

## Performance Optimizations
- Lazy loading for the main calculator component
- Memoized calculations to prevent unnecessary re-renders
- Responsive design optimized for mobile and desktop

# External Dependencies

## Core Framework
- **Next.js 14.2.6**: React framework for server-side rendering and routing
- **React 18.3.1**: Core UI library
- **TypeScript 5**: Type safety and development experience

## UI and Styling
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **next-themes 0.3.0**: Theme management for dark/light mode
- **Lucide React 0.435.0**: Modern icon library
- **React Icons 5.3.0**: Additional icon collection

## Data Visualization
- **Recharts 2.12.7**: Chart library for mortgage data visualization

## External APIs
- **CoinGecko API**: Real-time Bitcoin price data for cryptocurrency-related calculations and features

## Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing and optimization

The application is structured to easily integrate with backend services for user authentication, payment processing, and data persistence when scaling beyond the current client-side implementation.
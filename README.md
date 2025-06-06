# We Want Waste - React Application

A modern, responsive skip hire booking application built with React, TypeScript, and Tailwind CSS. This project demonstrates a complete redesign of a skip hire selection interface with focus on user experience, accessibility, and modern web development practices.

## Project Overview

This application allows users to browse and select skip sizes for waste management services. The interface features a clean, modern design with dark/light mode support, responsive layouts, and comprehensive availability management.

## Design Approach

### **Complete UI/UX Redesign**

The original design was a dark-themed, utilitarian interface. Our approach was to create a completely fresh, modern experience:

- **Light-first design** with optional dark mode
- **Card-based layout** with modern gradients and shadows
- **Improved visual hierarchy** with better typography and spacing
- **Enhanced user feedback** with animations and state indicators
- **Mobile-first responsive design** that scales beautifully

### **Key Design Principles**

1. **User-Centric Design**
   - Clear visual feedback for all interactions
   - Intuitive navigation with progress indicators
   - Accessible design following WCAG guidelines

2. **Modern Aesthetics**
   - Clean, minimalist interface
   - Consistent color palette and typography
   - Smooth animations and transitions
   - Professional branding elements

3. **Responsive Excellence**
   - Mobile-first approach
   - Flexible grid systems
   - Adaptive typography and spacing
   - Touch-friendly interactions

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Bun (package manager & runtime)
- Shadcn UI (components)

### **Component Architecture**

1. **Modular Design**
   - Separated concerns with dedicated components
   - Reusable UI components following single responsibility principle
   - Custom hooks for complex logic (theme management)

2. **Type Safety**
   - Comprehensive TypeScript interfaces
   - Strict type checking for API responses
   - Type-safe component props and state

3. **State Management**
   - Local state with React hooks
   - Context API for theme management
   - React Router state for navigation data

## Key Features

### **Skip Selection Interface**

- **Dynamic skip cards** with modern design
- **Availability indicators** with visual feedback
- **Popular skip highlighting** to guide user decisions
- **Restriction warnings** for road placement and heavy waste
- **Price transparency** with VAT breakdown

### **Availability Management**

- **Visual unavailability indicators**
  - Disabled interaction states
- **Selection protection** preventing unavailable skip selection
- **Smart defaults** selecting first available skip

### **Theme System**

- **Light/Dark mode toggle** with smooth transitions
- **System preference detection** for initial theme
- **Persistent theme storage** using localStorage
- **Comprehensive theming** across all components

### **Responsive Design**

- **Mobile-optimized** layouts and interactions
- **Progressive enhancement** from mobile to desktop
- **Touch-friendly** buttons and interactive elements
- **Adaptive grid systems** for different screen sizes

## User Experience Features

### **Progress Indication**

- **Visual progress steps** showing booking flow
- **Completed state indicators** with checkmarks
- **Current step highlighting** for orientation

### **Loading & Error States**

- **Skeleton loading** with animated spinners
- **Error handling** with user-friendly messages
- **Empty states** for no results scenarios

## Data Flow

### **API Integration**

1. **Fetch skip data** from external API
2. **Process availability** status (simulated for demo)
3. **Update component state** with processed data
4. **Handle loading and error states**

### **Selection Logic**

1. **Filter available skips** for selection
2. **Auto-select first available** skip on load
3. **Prevent unavailable selection** with validation
4. **Update UI state** with selection changes

## Getting Started

### **Prerequisites**

- Bun (https://bun.sh)

### **Installation**

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd skip-hire

# Install dependencies
bun install
```

### **Development**

```bash
# Start development server with hot reload
bun run dev
```

### Production

```bash
# Build for production and start preview server
bun run build
bun run start
```

## License

This project is licensed under the MIT License

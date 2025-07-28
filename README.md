# IMA CRM - Frontend TTS (Operator)

A simplified Next.js application for IMA CRM operator functionality, focused on Group Profile export and trip management.

## 🚀 Overview

This is a streamlined version of the IMA CRM frontend, specifically designed for operators to:
- Export Group Profile documents
- Manage trip data
- Generate DOCX files with trip information

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: NextUI 2.2.9
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Animations**: Framer Motion

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout group
│   │   ├── personal/      # Personal routes
│   │   │   └── operator/  # Operator page
│   │   └── layout.js      # Main layout
│   ├── layout.js          # Root layout
│   ├── providers.js       # App providers
│   └── page.js            # Root page
├── components/            # Reusable components
│   ├── layouts/           # Layout components
│   │   ├── Header.js      # App header
│   │   ├── HeaderMenu.js  # Header menu
│   │   ├── MainLayout.js  # Main layout wrapper
│   │   └── Sidebar.js     # Navigation sidebar
│   └── common/            # Common components
├── configs/               # Configuration files
│   ├── menuItems.js       # Navigation menu items
│   ├── routesPermission.js # Route permissions
│   └── urls.js            # API endpoints
├── api/                   # API configuration
│   └── config/
│       └── axios.js       # HTTP client setup
├── store/                 # Redux store
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
├── styles/                # Global styles
└── middleware.js          # Next.js middleware
```

## 🎯 Features

### Core Functionality
- **Group Profile Export**: Generate DOCX documents from trip data
- **Trip Management**: View and select trips for export
- **Document Preview**: Preview generated documents before download
- **Responsive Design**: Works on desktop and mobile devices

### Simplified Interface
- **Minimal Header**: Clean header with app title
- **Simple Sidebar**: Single "Operator" navigation item
- **Focused Layout**: Streamlined UI for operator tasks

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd services/frontend-tts
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3005](http://localhost:3005)

## 📁 Key Files

### Routing & Navigation
- `src/middleware.js` - Redirects root to `/personal/operator`
- `src/configs/routesPermission.js` - Simplified route permissions
- `src/configs/menuItems.js` - Navigation menu configuration

### Layout Components
- `src/components/layouts/MainLayout.js` - Main app layout
- `src/components/layouts/Header.js` - App header
- `src/components/layouts/Sidebar.js` - Navigation sidebar

### Operator Page
- `src/app/(main)/personal/operator/page.js` - Main operator interface

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Port Configuration
- Development: Port 3005
- Production: Port 3005

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run format       # Format code with Prettier
npm run lint         # Lint and fix code
```

## 🎨 UI Components

### Layout System
- **Header**: Simple header with app title and menu
- **Sidebar**: Navigation with single "Operator" item
- **Main Content**: Responsive content area

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **NextUI**: Modern React UI components
- **Responsive**: Mobile-first design approach

## 🔄 State Management

### Redux Store
- **Redux Toolkit**: Modern Redux with simplified API
- **Redux Persist**: Persistent state storage
- **Store Structure**: Simplified for operator needs

## 🌐 API Integration

### HTTP Client
- **Axios**: HTTP client for API calls
- **Simplified Auth**: No complex authentication
- **Error Handling**: Basic error management

### API Endpoints
- Trip management endpoints
- Document generation endpoints

## 📱 Responsive Design

- **Desktop**: Full sidebar and header layout
- **Mobile**: Bottom navigation bar
- **Tablet**: Adaptive layout

## 🚀 Deployment

### Docker
```bash
# Build Docker image
docker build -t ima-frontend-tts .

# Run container
docker run -p 3005:3005 ima-frontend-tts
```

### Environment Setup
Ensure all environment variables are properly configured for production.

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for new components
3. Follow the established naming conventions
4. Test on both desktop and mobile

## 📄 License

This project is part of the IMA CRM system.

---

**Note**: This is a simplified version focused on operator functionality. For full CRM features, see the main frontend application.

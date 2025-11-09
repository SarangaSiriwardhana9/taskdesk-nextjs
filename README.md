# TaskDesk - Modern Task Management Application

A beautiful, responsive task management application built with Next.js 16, TypeScript, and Supabase. Features user authentication, task CRUD operations, priority management, and a modern UI with smooth animations.

![TaskDesk Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=TaskDesk+Preview)

## 🚀 Live Demo

- **Live Application**: [Your Vercel URL Here]
- **Assignment Submission**: Built as part of a technical assessment

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - Email/password signup and login via Supabase Auth
- 📝 **Complete Task Management** - Create, read, update, delete, and view tasks
- 🎯 **Priority System** - Low (Yellow), Medium (Blue), High (Red) priority levels with color coding
- ✅ **Completion Tracking** - Toggle task completion status with visual feedback
- 📅 **Due Date Management** - Set and track task deadlines with overdue detection
- 👁️ **Task View Mode** - Read-only task details view with all information displayed
- 🔒 **User Isolation** - Each user sees only their own tasks (Row Level Security)

### User Experience
- 📱 **Mobile Responsive** - Optimized for all devices including old iPhones
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Optimistic Updates** - Smooth UX with immediate feedback
- 🔄 **Real-time Updates** - Instant synchronization with database
- 📊 **Task Statistics** - Dashboard with total, pending, completed, today, and overdue tasks
- 🎯 **Quick Actions** - Easy task completion, editing, and viewing
- 🔍 **Task Filtering** - Filter by all, pending, or completed tasks
- 📈 **Smart Sorting** - Sort by date, priority, or due date

### Enhanced Features
- 🚀 **Auto-close Modals** - Modals automatically close after task completion actions
- 💚 **Success Styling** - Proper success button variants for completion actions
- 🎨 **Consistent Design** - All components follow the design system
- 📝 **Profile Management** - Update user profile with name changes
- 🌙 **Theme Support** - Dark/light mode compatibility

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **Runtime**: React 19.2.0
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js Server Actions
- **Security**: Row Level Security (RLS)

### Deployment
- **Platform**: Vercel/Netlify
- **CI/CD**: Automatic deployment from GitHub

## 📁 Project Structure

```
taskdesk/
├── app/                          # Next.js App Router
│   ├── (app)/                   # Authenticated app routes
│   │   ├── tasks/               # Tasks page
│   │   └── profile/             # User profile
│   ├── (auth)/                  # Authentication routes
│   │   └── auth/                # Login/signup page
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── features/                # Feature-specific components
│   │   ├── auth/               # Authentication components
│   │   ├── tasks/              # Task management components
│   │   └── header/             # Navigation components
│   ├── forms/                  # Form components
│   │   ├── sign-in-form/       # Login form
│   │   ├── sign-up-form/       # Registration form
│   │   └── task-form/          # Task creation/editing
│   └── ui/                     # Reusable UI components
├── lib/                        # Utilities and configurations
│   ├── auth/                   # Authentication logic
│   ├── tasks/                  # Task management actions
│   ├── stores/                 # Zustand stores
│   ├── supabase/              # Supabase client configuration
│   └── constants/             # App constants
├── supabase/                   # Database schema and migrations
│   └── migrations/             # SQL migration files
└── types/                      # TypeScript type definitions
```

## 🗄️ Database Schema

### Tasks Table
- `id` - UUID primary key (auto-generated)
- `user_id` - Foreign key to auth.users (with cascade delete)
- `title` - Task title (required)
- `description` - Task description (optional)
- `priority` - Enum: 'Low', 'Medium', 'High' (default: 'Medium')
- `due_date` - Optional due date
- `completed` - Boolean completion status (default: false)
- `created_at` - Timestamp (auto-generated)
- `updated_at` - Timestamp (auto-updated via trigger)

### Profiles Table
- `id` - UUID primary key (references auth.users)
- `display_name` - User's display name
- `avatar_url` - Optional avatar URL
- `created_at` - Timestamp (auto-generated)
- `updated_at` - Timestamp (auto-updated via trigger)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd taskdesk
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
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase database**
   
   Run the migration files in your Supabase SQL editor:
   ```sql
   -- Run supabase/migrations/001_initial_schema.sql
   -- Then run supabase/migrations/002_seed_data.sql (optional)
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🔐 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication** - Secure email/password authentication via Supabase
- **Input Validation** - Form validation with Zod schemas
- **SQL Injection Protection** - Parameterized queries via Supabase client
- **CSRF Protection** - Built-in Next.js protections

## 🎨 UI/UX Features

### Design System
- **Responsive Design** - Mobile-first approach optimized for all screen sizes
- **Component Library** - Custom shadcn/ui components with consistent styling
- **Color System** - Priority-based color coding (Yellow/Blue/Red)
- **Typography** - Responsive text utilities for better mobile readability
- **Button Variants** - Success, outline, gradient, and social button styles

### Interactive Elements
- **Dark/Light Mode** - Theme switching capability with smooth transitions
- **Loading States** - Skeleton loaders, spinners, and loading animations
- **Error Handling** - User-friendly error messages and validation
- **Optimistic Updates** - Immediate UI feedback before server confirmation
- **Smooth Animations** - CSS transitions, hover effects, and micro-interactions
- **Touch-Friendly** - Proper touch targets for mobile devices (44px minimum)

### Mobile Optimization
- **Old iPhone Support** - Tested and optimized for older iOS devices
- **Scrollable Modals** - Full-height modals with proper scrolling on mobile
- **Larger Text** - Improved readability with responsive font sizes
- **Better Buttons** - Fixed-size buttons that don't change during loading states

## 📱 Pages

### Authentication (`/auth`)
- Combined login/signup form
- OAuth integration ready (Google, GitHub)
- Form validation and error handling
- Automatic redirect after authentication

### Tasks Dashboard (`/tasks`)
- **Task Statistics Header** - Overview of total, pending, completed, today, and overdue tasks
- **Task Management** - Create, edit, view, and delete tasks with full CRUD operations
- **Priority System** - Visual priority indicators with color-coded borders and badges
- **Due Date Tracking** - Set due dates with overdue detection and warnings
- **Filtering & Sorting** - Filter by status and sort by date, priority, or due date
- **Task Actions** - Quick completion toggle, view details, edit, and delete options
- **Responsive Layout** - Grid layout that adapts to screen size
- **Empty States** - Helpful guidance for new users
- **Pagination** - Efficient loading of large task lists

### Task Modal Features
- **Three Modes** - Create, Edit, and View modes with appropriate UI
- **View Mode** - Read-only display of all task details
- **Completion Actions** - Mark complete/incomplete directly from modal
- **Auto-close** - Modal automatically closes after completion actions
- **Form Validation** - Real-time validation with error messages
- **Responsive Design** - Scrollable content on mobile devices

### Profile (`/profile`)
- **Profile Management** - Update display name and personal information
- **Account Security** - View account details and security settings
- **Avatar Support** - Profile picture display and management
- **Form Validation** - Real-time validation for profile updates

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

## 🤝 Contributing

This project was built as part of a technical assessment. The code follows modern React and Next.js best practices:

- TypeScript for type safety
- Component composition patterns
- Custom hooks for logic reuse
- Server Actions for API calls
- Proper error handling and loading states

## 📄 Assignment Requirements Checklist

### Core Requirements
- ✅ **Next.js 16** - App Router with TypeScript 5 and React 19
- ✅ **Supabase Integration** - Authentication and PostgreSQL database
- ✅ **User Authentication** - Signup/signin with email and password
- ✅ **Task CRUD Operations** - Create, read, update, delete tasks
- ✅ **User Isolation** - Row Level Security (RLS) policies implemented
- ✅ **Task Completion** - Toggle completion status with visual feedback
- ✅ **Form Management** - React Hook Form with Zod validation
- ✅ **Modern Styling** - Tailwind CSS and shadcn/ui components
- ✅ **Responsive Design** - Mobile-first approach with cross-device compatibility
- ✅ **Production Deployment** - Ready for Vercel/Netlify deployment
- ✅ **Database Migrations** - Complete schema and seed data files
- ✅ **Professional UI** - Clean, modern interface with smooth interactions

### Enhanced Features (Beyond Requirements)
- ✅ **Task View Mode** - Read-only task details display
- ✅ **Priority System** - Color-coded priority levels (Low/Medium/High)
- ✅ **Due Date Management** - Date selection with overdue tracking
- ✅ **Task Statistics** - Dashboard with comprehensive task metrics
- ✅ **Advanced Filtering** - Filter and sort tasks by multiple criteria
- ✅ **Profile Management** - User profile updates and management
- ✅ **Mobile Optimization** - Enhanced mobile experience with proper touch targets
- ✅ **Auto-close Modals** - Improved UX with automatic modal closing
- ✅ **Success Styling** - Proper button variants and design system
- ✅ **Overdue Detection** - Smart overdue task identification and highlighting

 


---

**Note**: This application demonstrates modern web development practices including authentication, database design, responsive UI, and deployment. Built with attention to security, performance, and user experience.

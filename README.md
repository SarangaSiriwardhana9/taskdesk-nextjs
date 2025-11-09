# TaskDesk - Modern Task Management Application

A beautiful, responsive task management application built with Next.js 15+, TypeScript, and Supabase. Features user authentication, task CRUD operations, priority management, and a modern UI with smooth animations.

![TaskDesk Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=TaskDesk+Preview)

## 🚀 Live Demo

- **Live Application**: [Your Vercel URL Here]
- **Assignment Submission**: Built as part of a technical assessment

## ✨ Features

- 🔐 **Secure Authentication** - Email/password signup and login via Supabase Auth
- 📝 **Task Management** - Create, read, update, and delete tasks
- 🎯 **Priority System** - Low, Medium, High priority levels with color coding
- ✅ **Completion Tracking** - Toggle task completion status
- 📅 **Due Dates** - Set and track task deadlines
- 🔒 **User Isolation** - Each user sees only their own tasks (Row Level Security)
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Optimistic Updates** - Smooth UX with immediate feedback
- 🔄 **Real-time Updates** - Instant synchronization with database

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
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

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Theme switching capability
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Optimistic Updates** - Immediate UI feedback
- **Smooth Animations** - CSS transitions and hover effects

## 📱 Pages

### Authentication (`/auth`)
- Combined login/signup form
- OAuth integration ready (Google, GitHub)
- Form validation and error handling
- Automatic redirect after authentication

### Tasks Dashboard (`/tasks`)
- Task list with filtering and pagination
- Create new tasks with priority and due dates
- Edit existing tasks inline
- Delete tasks with confirmation
- Toggle completion status
- Empty state for new users

### Profile (`/profile`)
- User profile management
- Avatar upload capability
- Account settings

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

- ✅ Next.js 15+ with App Router and TypeScript
- ✅ Supabase for authentication and database
- ✅ User signup/signin functionality
- ✅ Create, list, and delete tasks
- ✅ User isolation (RLS policies)
- ✅ Task completion status (checkbox)
- ✅ React Hook Form for forms
- ✅ Tailwind CSS and shadcn/ui for styling
- ✅ Responsive design
- ✅ Deployed on Vercel/Netlify
- ✅ Migration files included
- ✅ Clean, professional UI

## 📞 Contact

Built by [Your Name] as part of a technical assessment.

- **Email**: [your-email@example.com]
- **LinkedIn**: [Your LinkedIn Profile]
- **Portfolio**: [Your Portfolio URL]

---

**Note**: This application demonstrates modern web development practices including authentication, database design, responsive UI, and deployment. Built with attention to security, performance, and user experience.

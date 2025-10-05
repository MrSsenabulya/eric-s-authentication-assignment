# Simple User Authentication App

A React application with authentication flow using Mantine UI, React Router, and Clerk.

## Features

- **Signup Page** (`/signup`): User registration with form validation and Clerk authentication
- **Login Page** (`/login`): User login with email/password and Google OAuth via Clerk
- **Dashboard Page** (`/dashboard`): Protected page showing user details
- **Authentication Protection**: Routes are protected and redirect to login if not authenticated

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Get your Publishable Key from the API Keys section
4. Update the Clerk configuration in `src/App.jsx`:

```javascript
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'your-clerk-publishable-key';
```

5. Or create a `.env` file in the root directory:
```
VITE_CLERK_PUBLISHABLE_KEY=your-actual-clerk-publishable-key
```

6. In Clerk Dashboard, configure your OAuth providers:
   - Go to "User & Authentication" → "Social Connections"
   - Enable Google OAuth
   - Add your redirect URLs: `http://localhost:5174/dashboard`

### 3. Run the Application
```bash
npm run dev
```

## How It Works

### Clerk Authentication
- Users can sign up with full name, email, and password
- Clerk handles user management and authentication
- Login validates credentials through Clerk
- Google OAuth is handled by Clerk
- Successful authentication redirects to dashboard

### Protected Routes
- Dashboard page is protected and requires authentication
- Unauthenticated users are redirected to login page
- Authentication state is managed by Clerk

## File Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx   # Route protection component using Clerk
├── pages/
│   ├── SignupPage.jsx       # User registration with Clerk
│   ├── LoginPage.jsx        # User login + Google OAuth via Clerk
│   └── DashboardPage.jsx   # Protected dashboard page
└── App.jsx                  # Main app with Clerk provider and routing
```

## Technologies Used

- **React** - Frontend framework
- **Mantine UI** - UI component library
- **React Router** - Client-side routing
- **Clerk** - Authentication service
- **Vite** - Build tool and dev server# eric-s-authentication-assignment

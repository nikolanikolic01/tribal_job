# Authentication API Integration

## Overview
This project uses Supabase authentication API for user signup and login functionality.

## API Endpoints

### Base URL
```
https://ejiwirjgosdyeulhcejt.supabase.co/functions/v1/auth
```

### 1. Signup
**Endpoint:** `POST /signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "candidate"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "first_name": "John",
      "last_name": "Doe",
      "role": "candidate"
    }
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600
  },
  "access_token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

### 2. Login
**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (Same structure as signup response)

## Implementation Files

### 1. Auth Service (`/src/services/authService.js`)
Central service for all authentication API calls:
- `signup({ email, password, first_name, last_name })` - Register new user
- `login({ email, password })` - Authenticate user
- `logout()` - Clear local storage
- `getCurrentUser()` - Get user from localStorage
- `getAccessToken()` - Get stored access token
- `getRefreshToken()` - Get stored refresh token
- `isAuthenticated()` - Check if user is logged in

### 2. Auth Context (`/src/contexts/AuthContext.js`)
React context for managing authentication state:
- `user` - Current user object
- `loading` - Loading state
- `login(email, password)` - Login function
- `signup(email, password, firstName, lastName)` - Signup function
- `logout()` - Logout function

### 3. Pages
- **Signup Page** (`/src/app/signup/page.js`)
  - Form with firstName, lastName, email, password fields
  - Password confirmation
  - Terms agreement checkbox
  - Loading and error states
  
- **Login Page** (`/src/app/login/page.js`)
  - Email and password fields
  - Remember me option
  - Forgot password modal
  - Loading and error states

## Storage
User data and tokens are stored in `localStorage`:
- `access_token` - JWT access token
- `refresh_token` - Refresh token for obtaining new access token
- `user` - User object (JSON stringified)

## Usage Example

### Signup
```javascript
import { useAuth } from '@/contexts/AuthContext';

function SignupComponent() {
  const { signup } = useAuth();
  
  const handleSignup = async () => {
    const result = await signup(email, password, firstName, lastName);
    if (result.success) {
      // Redirect to home or profile
    } else {
      // Show error message
      console.error(result.error);
    }
  };
}
```

### Login
```javascript
import { useAuth } from '@/contexts/AuthContext';

function LoginComponent() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Redirect to profile
    } else {
      // Show error message
      console.error(result.error);
    }
  };
}
```

### Check Authentication
```javascript
import { useAuth } from '@/contexts/AuthContext';

function ProtectedComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;
  
  return <div>Welcome {user.user_metadata.first_name}!</div>;
}
```

## Error Handling
All API functions return an object with:
```javascript
{
  success: boolean,
  data?: object,    // Response data if successful
  error?: string    // Error message if failed
}
```

## Security Notes
- Passwords are sent over HTTPS
- Access tokens are stored in localStorage (consider using httpOnly cookies for production)
- Always validate user input before sending to API
- Implement token refresh mechanism for expired tokens

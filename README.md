# FitCoach Pro - Professional Fitness Coaching Platform

A comprehensive fitness coaching platform built with React, TypeScript, and Tailwind CSS. This platform enables gym instructors and fitness coaches to manage clients, create workout plans, upload training videos, and process payments through M-Pesa integration.

## Features

### For Clients
- **User Authentication** - Secure login and registration
- **Personalized Dashboard** - Track progress, view stats, and manage workouts
- **Workout Plans** - Access to custom workout plans created by coaches
- **Video Library** - Browse and watch instructional fitness videos
- **Progress Tracking** - Monitor fitness journey with detailed analytics
- **M-Pesa Payments** - Easy and secure payment processing
- **Mobile Responsive** - Works perfectly on all devices

### For Coaches
- **Coach Dashboard** - Comprehensive overview of business metrics
- **Client Management** - Track client progress and manage relationships
- **Video Upload** - Upload and organize training videos
- **Workout Plan Creation** - Design custom workout plans for clients
- **Revenue Tracking** - Monitor earnings and business growth
- **Session Scheduling** - Manage appointments and sessions

### Technical Features
- **React 18** with TypeScript for type safety
- **React Router** for navigation
- **Tailwind CSS** for beautiful, responsive design
- **Context API** for state management
- **React Dropzone** for file uploads
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Clean, professional interface

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fitness-coaching-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials
- **Client Account**: `client@demo.com` / `password`
- **Coach Account**: `coach@fitcoach.com` / `password`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── CoachDashboard.tsx
│   ├── WorkoutPlansPage.tsx
│   ├── VideoLibraryPage.tsx
│   ├── PaymentPage.tsx
│   └── ProfilePage.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Key Features Implementation

### Authentication System
- JWT-based authentication (ready for backend integration)
- Role-based access control (Client/Coach)
- Protected routes
- Persistent login state

### Payment Integration
- M-Pesa payment interface
- Multiple payment methods support
- Secure payment processing
- Subscription management

### Video Management
- Drag & drop video upload
- Video categorization and search
- Responsive video player
- Progress tracking

### Workout Plans
- Custom plan creation for coaches
- Plan browsing and purchase for clients
- Progress tracking
- Difficulty levels and categorization

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify, Vercel, or similar
1. Build the project
2. Upload the `dist` folder to your hosting service
3. Configure environment variables for production

### Environment Variables
Create a `.env` file for production:
```
VITE_API_URL=your-backend-api-url
VITE_MPESA_API_KEY=your-mpesa-api-key
```

## Backend Integration

This frontend is ready for backend integration. You'll need to implement:

1. **Authentication API**
   - POST `/auth/login`
   - POST `/auth/register`
   - GET `/auth/me`

2. **User Management**
   - GET `/users/profile`
   - PUT `/users/profile`

3. **Workout Plans**
   - GET `/workout-plans`
   - POST `/workout-plans`
   - PUT `/workout-plans/:id`

4. **Video Management**
   - POST `/videos/upload`
   - GET `/videos`
   - DELETE `/videos/:id`

5. **Payment Processing**
   - POST `/payments/mpesa`
   - GET `/payments/status/:id`

## M-Pesa Integration

To integrate M-Pesa payments:

1. Register with Safaricom for M-Pesa API access
2. Obtain API credentials
3. Implement backend M-Pesa STK Push
4. Handle payment callbacks
5. Update subscription status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@fitcoachpro.com
- Phone: +254 712 345 678

## Future Enhancements

- [ ] Real-time chat between coaches and clients
- [ ] Nutrition tracking and meal planning
- [ ] Wearable device integration
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Social features and community
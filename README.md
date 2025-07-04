# FitCoach Pro - Complete Fitness Coaching Platform

A comprehensive fitness coaching platform built with React, TypeScript, and Node.js, featuring seamless M-Pesa payment integration for the Kenyan market.

## 🌟 Features

### For Clients
- **User Authentication** - Secure login and registration
- **Personalized Dashboard** - Track progress, view stats, and manage workouts
- **Workout Plans** - Access to custom workout plans created by coaches
- **Video Library** - Browse and watch instructional fitness videos
- **Progress Tracking** - Monitor fitness journey with detailed analytics
- **M-Pesa Payments** - Easy and secure mobile money payments
- **Mobile Responsive** - Works perfectly on all devices

### For Coaches
- **Coach Dashboard** - Comprehensive overview of business metrics
- **Client Management** - Track client progress and manage relationships
- **Video Upload** - Upload and organize training videos with drag & drop
- **Workout Plan Creation** - Design custom workout plans for clients
- **Revenue Tracking** - Monitor earnings and business growth
- **Session Scheduling** - Manage appointments and sessions

### Payment Integration
- **M-Pesa STK Push** - Seamless mobile money payments
- **Real-time Callbacks** - Instant payment status updates
- **Multiple Plans** - Basic (KSh 2,500), Premium (KSh 5,000), Elite (KSh 8,500)
- **Secure Processing** - PCI compliant and SSL encrypted
- **Transaction Tracking** - Complete payment history and receipts

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- M-Pesa API credentials (for payments)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd fitness-coaching-platform
npm install
cd backend && npm install && cd ..
```

### 2. Environment Setup

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=FitCoach Pro
```

**Backend (backend/.env):**
```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
MPESA_ENVIRONMENT=sandbox
PORT=3000
```

### 3. Start Development

**Option 1: Start both frontend and backend together**
```bash
npm run start:full
```

**Option 2: Start separately**
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Health Check:** http://localhost:3000/health

## 🔐 Demo Credentials

- **Client Account:** `client@demo.com` / `password`
- **Coach Account:** `coach@fitcoach.com` / `password`

## 💳 M-Pesa Integration

### Setup M-Pesa API

1. **Get Credentials:**
   - Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
   - Create an app and get Consumer Key/Secret
   - Get Business Shortcode and Passkey

2. **Configure Callback URL:**
   - For local development: Use ngrok to expose localhost
   - For production: Use your domain with HTTPS

3. **Test Payments:**
   - Sandbox test numbers: `254708374149`, `254711111111`
   - Use small amounts (KSh 1-10) for testing

### Payment Flow

1. User selects a plan and enters phone number
2. Frontend calls backend to initiate STK Push
3. Backend sends request to M-Pesa API
4. User receives M-Pesa prompt on phone
5. User enters PIN to authorize payment
6. M-Pesa sends callback to backend webhook
7. Backend updates payment status
8. Frontend shows success/failure message

## 🏗️ Project Structure

```
fitness-coaching-platform/
├── src/                          # Frontend React app
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page components
│   ├── services/               # API services
│   ├── contexts/               # React contexts
│   └── App.tsx                 # Main app component
├── backend/                     # Node.js API server
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment template
├── public/                      # Static assets
└── package.json                # Frontend dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user

### Payments
- `POST /api/mpesa/initiate` - Initiate M-Pesa payment
- `GET /api/mpesa/status/:id` - Check payment status
- `POST /api/mpesa/callback` - M-Pesa webhook (internal)

### Content
- `GET /api/videos` - Get video library
- `POST /api/videos/upload` - Upload video (coaches)
- `GET /api/workout-plans` - Get workout plans
- `POST /api/workout-plans` - Create workout plan (coaches)

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy dist folder** to your hosting service

3. **Set environment variables:**
   ```
   VITE_API_URL=https://your-api-domain.com
   ```

### Backend (Railway/Heroku/DigitalOcean)

1. **Prepare for deployment:**
   ```bash
   cd backend
   npm install --production
   ```

2. **Set environment variables** on your hosting platform

3. **Deploy** using your platform's deployment method

### Using Docker

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
```

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security Features

- **JWT Authentication** - Secure user sessions
- **Input Validation** - Sanitized user inputs
- **CORS Protection** - Configured cross-origin requests
- **SSL/HTTPS** - Encrypted data transmission
- **Payment Security** - PCI compliant M-Pesa integration
- **Rate Limiting** - API abuse prevention

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch Friendly** - Optimized for mobile interactions
- **Fast Loading** - Optimized images and code splitting
- **Offline Support** - Service worker for basic offline functionality

## 🧪 Testing

**Frontend Tests:**
```bash
npm run test
```

**Backend Tests:**
```bash
cd backend && npm test
```

**M-Pesa Integration Test:**
```bash
curl -X POST http://localhost:3000/api/mpesa/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "254708374149",
    "amount": 1,
    "accountReference": "TEST_12345"
  }'
```

## 📊 Monitoring & Analytics

- **Payment Tracking** - Success/failure rates
- **User Analytics** - Registration and engagement metrics
- **Performance Monitoring** - API response times
- **Error Logging** - Comprehensive error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Email:** support@fitcoachpro.com
- **Phone:** +254 712 345 678
- **Documentation:** [API Docs](https://api.fitcoachpro.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Safaricom** for M-Pesa API
- **React Team** for the amazing framework
- **Tailwind CSS** for beautiful styling
- **Lucide** for the icon library

---

**Built with ❤️ for the Kenyan fitness community**
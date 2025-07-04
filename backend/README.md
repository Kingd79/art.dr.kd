# FitCoach Pro Backend API

Backend server for the FitCoach Pro fitness coaching platform with M-Pesa payment integration.

## Features

- **M-Pesa STK Push Integration** - Secure mobile money payments
- **Payment Callback Handling** - Real-time payment status updates
- **RESTful API** - Clean and documented endpoints
- **Error Handling** - Comprehensive error management
- **Environment Configuration** - Easy deployment setup

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your M-Pesa credentials:

```bash
cp .env.example .env
```

Edit `.env` with your M-Pesa API credentials:

```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
```

### 3. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Payment Endpoints

#### Initiate M-Pesa Payment
```http
POST /api/mpesa/initiate
Content-Type: application/json

{
  "phoneNumber": "254712345678",
  "amount": 5000,
  "accountReference": "FITCOACH_12345",
  "transactionDesc": "Premium Plan Subscription"
}
```

#### Check Payment Status
```http
GET /api/mpesa/status/:checkoutRequestID
```

#### M-Pesa Callback (Webhook)
```http
POST /api/mpesa/callback
```

### Health Check
```http
GET /health
```

## M-Pesa Integration Setup

### 1. Get M-Pesa API Credentials

1. Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an account and new app
3. Get your Consumer Key and Consumer Secret
4. Configure your callback URL

### 2. Sandbox vs Production

**Sandbox (Testing):**
- Use test credentials
- Base URL: `https://sandbox.safaricom.co.ke`
- Test phone numbers: `254708374149`, `254711111111`

**Production:**
- Use live credentials
- Base URL: `https://api.safaricom.co.ke`
- Real phone numbers and transactions

### 3. Callback URL Configuration

Your callback URL must be:
- Publicly accessible (use ngrok for local development)
- HTTPS enabled
- Able to handle POST requests

For local development with ngrok:
```bash
ngrok http 3000
# Use the HTTPS URL as your callback URL
```

## Payment Flow

1. **Frontend** initiates payment with user details
2. **Backend** sends STK Push request to M-Pesa API
3. **User** receives M-Pesa prompt on their phone
4. **User** enters M-Pesa PIN to authorize payment
5. **M-Pesa** sends callback to your webhook
6. **Backend** processes callback and updates payment status
7. **Frontend** polls for payment status updates

## Error Handling

The API includes comprehensive error handling for:
- Invalid M-Pesa credentials
- Network timeouts
- Invalid phone numbers
- Insufficient funds
- User cancellation

## Security Considerations

- Store M-Pesa credentials securely
- Validate all callback requests
- Implement rate limiting
- Use HTTPS in production
- Sanitize user inputs
- Log all transactions

## Deployment

### Using PM2 (Recommended)

```bash
npm install -g pm2
pm2 start server.js --name "fitcoach-api"
pm2 startup
pm2 save
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
MPESA_ENVIRONMENT=production
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
```

## Testing

Run the test suite:

```bash
npm test
```

Test M-Pesa integration with sandbox:

```bash
curl -X POST http://localhost:3000/api/mpesa/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "254708374149",
    "amount": 1,
    "accountReference": "TEST_12345",
    "transactionDesc": "Test Payment"
  }'
```

## Monitoring

Monitor your application with:
- Payment success/failure rates
- Response times
- Error logs
- Transaction volumes

## Support

For M-Pesa integration support:
- [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- [M-Pesa API Documentation](https://developer.safaricom.co.ke/docs)

## License

MIT License - see LICENSE file for details.
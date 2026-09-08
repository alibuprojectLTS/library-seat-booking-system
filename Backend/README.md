markdown
# Library Seat Booking System - Backend API

A robust RESTful API for managing library seat bookings, built with Node.js, Express, and PostgreSQL.

---

## 🚀 Tech Stack

| **Technology** | **Purpose** |
|----------------|-------------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| PostgreSQL | Database |
| Sequelize | ORM |
| JWT | Authentication |
| Swagger | API Documentation |
| Docker | Containerization |

---

## 📁 Project Structure
Backend/
├── src/
│ ├── config/
│ │ ├── database.js # PostgreSQL connection
│ │ ├── swagger.js # Swagger configuration
│ │ └── passport.js # Google OAuth (future)
│ │
│ ├── controllers/
│ │ ├── adminController.js # Admin dashboard & reports
│ │ ├── announcementController.js # Announcement CRUD
│ │ ├── authController.js # Register, Login, Profile
│ │ ├── bookingController.js # Booking creation & management
│ │ ├── csvController.js # CSV seat upload
│ │ ├── paymentController.js # PayChangu integration
│ │ ├── queryController.js # User queries & replies
│ │ ├── seatController.js # Seat map & availability
│ │ ├── statusController.js # Library status updates
│ │ ├── ticketController.js # Ticket & QR generation
│ │ └── userController.js # User profile management
│ │
│ ├── middleware/
│ │ ├── admin.js # Admin role verification
│ │ ├── auth.js # JWT authentication
│ │ ├── errorHandler.js # Global error handling
│ │ ├── rateLimiter.js # Rate limiting
│ │ ├── upload.js # Multer file upload
│ │ └── validation.js # Request validation
│ │
│ ├── models/
│ │ ├── index.js # Model associations
│ │ ├── Announcement.js # Announcement model
│ │ ├── Booking.js # Booking model
│ │ ├── BookingItem.js # Booking items model
│ │ ├── LibrarySection.js # Library sections model
│ │ ├── LibraryStatus.js # Library status model
│ │ ├── NewsletterSubscription.js # Newsletter model
│ │ ├── Notification.js # Notification model
│ │ ├── Payment.js # Payment model
│ │ ├── Query.js # User query model
│ │ ├── QueryReply.js # Query reply model
│ │ ├── Seat.js # Seat model
│ │ ├── Ticket.js # Ticket model
│ │ └── User.js # User model
│ │
│ ├── routes/
│ │ ├── index.js # Main router
│ │ ├── adminRoutes.js # Admin routes
│ │ ├── announcementRoutes.js # Announcement routes
│ │ ├── authRoutes.js # Authentication routes
│ │ ├── bookingRoutes.js # Booking routes
│ │ ├── paymentRoutes.js # Payment routes
│ │ ├── queryRoutes.js # Query routes
│ │ ├── seatRoutes.js # Seat routes
│ │ ├── statusRoutes.js # Status routes
│ │ ├── ticketRoutes.js # Ticket routes
│ │ └── userRoutes.js # User routes
│ │
│ ├── services/
│ │ ├── csvService.js # CSV parsing
│ │ ├── emailService.js # Email sending
│ │ ├── notificationService.js # In-app notifications
│ │ ├── paymentService.js # PayChangu integration
│ │ └── qrService.js # QR code generation
│ │
│ ├── utils/
│ │ ├── constants.js # App constants
│ │ ├── helpers.js # Utility functions
│ │ ├── logger.js # Logging utility
│ │ └── response.js # Standardized responses
│ │
│ ├── validators/
│ │ ├── authValidator.js # Auth validation
│ │ ├── bookingValidator.js # Booking validation
│ │ ├── queryValidator.js # Query validation
│ │ └── seatValidator.js # Seat validation
│ │
│ └── index.js # Application entry point
│
├── uploads/ # CSV uploads folder
├── logs/ # Application logs
├── .env # Environment variables
├── .gitignore # Git ignore
├── docker-compose.yml # Docker Compose
├── Dockerfile # Docker configuration
├── package.json # Dependencies
├── package-lock.json # Lock file
└── README.md # Documentation

text

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# ============================================================
# SERVER CONFIGURATION
# ============================================================
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
API_URL=http://localhost:5000

# ============================================================
# DATABASE (PostgreSQL)
# ============================================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_booking
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
DB_LOGGING=true

# ============================================================
# JWT AUTHENTICATION
# ============================================================
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# ============================================================
# EMAIL CONFIGURATION (Gmail)
# ============================================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM="Library Seat Booking <your_email@gmail.com>"

# ============================================================
# PAYMENT (PayChangu)
# ============================================================
PAYCHANGU_API_URL=https://api.paychangu.com
PAYCHANGU_API_KEY=your_public_key
PAYCHANGU_SECRET_KEY=your_secret_key
PAYCHANGU_MODE=sandbox

# ============================================================
# APP SETTINGS
# ============================================================
MAX_SEATS_PER_BOOKING=5
TICKET_VALID_DAYS=1
INACTIVE_USER_DAYS=7
BOOKING_EXPIRY_MINUTES=15
🚀 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/alibuprojectLTS/library-seat-booking-system.git
cd library-seat-booking-system/Backend
2. Install dependencies
bash
npm install
3. Set up PostgreSQL
bash
# Create database
psql -U postgres
CREATE DATABASE library_booking;
\q
4. Configure environment
bash
cp .env.example .env
# Update .env with your credentials
5. Start the server
bash
# Development mode
npm run dev

# Production mode
npm start
📚 Current API Endpoints
🔐 Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/auth/me	Get current user profile	✅
📚 API Documentation
Once the server is running, Swagger documentation is available at:

text
http://localhost:5000/api-docs
🐳 Docker Setup
1. Start with Docker Compose
bash
docker-compose up -d
2. Stop containers
bash
docker-compose down
📋 Admin Credentials
Email	Password	Role
admin@library.com	FGBROC	Admin
📝 Common Commands
Command	Description
npm run dev	Start development server
npm start	Start production server
npm run swagger	Regenerate Swagger docs
📄 License
MIT

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS

Email: alibuprojectlts@gmail.com
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
│ │ ├── database.js
│ │ ├── swagger.js
│ │ └── passport.js
│ ├── controllers/
│ │ ├── adminController.js
│ │ ├── announcementController.js
│ │ ├── authController.js
│ │ ├── bookingController.js
│ │ ├── csvController.js
│ │ ├── paymentController.js
│ │ ├── queryController.js
│ │ ├── seatController.js
│ │ ├── statusController.js
│ │ ├── ticketController.js
│ │ └── userController.js
│ ├── middleware/
│ │ ├── admin.js
│ │ ├── auth.js
│ │ ├── errorHandler.js
│ │ ├── rateLimiter.js
│ │ ├── upload.js
│ │ └── validation.js
│ ├── models/
│ │ ├── index.js
│ │ ├── Announcement.js
│ │ ├── Booking.js
│ │ ├── BookingItem.js
│ │ ├── LibrarySection.js
│ │ ├── LibraryStatus.js
│ │ ├── NewsletterSubscription.js
│ │ ├── Notification.js
│ │ ├── Payment.js
│ │ ├── Query.js
│ │ ├── QueryReply.js
│ │ ├── Seat.js
│ │ ├── Ticket.js
│ │ └── User.js
│ ├── routes/
│ │ ├── index.js
│ │ ├── adminRoutes.js
│ │ ├── announcementRoutes.js
│ │ ├── authRoutes.js
│ │ ├── bookingRoutes.js
│ │ ├── paymentRoutes.js
│ │ ├── queryRoutes.js
│ │ ├── seatRoutes.js
│ │ ├── statusRoutes.js
│ │ ├── ticketRoutes.js
│ │ └── userRoutes.js
│ ├── services/
│ │ ├── csvService.js
│ │ ├── emailService.js
│ │ ├── notificationService.js
│ │ ├── paymentService.js
│ │ └── qrService.js
│ ├── utils/
│ │ ├── constants.js
│ │ ├── helpers.js
│ │ ├── logger.js
│ │ └── response.js
│ ├── validators/
│ │ ├── authValidator.js
│ │ ├── bookingValidator.js
│ │ ├── queryValidator.js
│ │ └── seatValidator.js
│ └── index.js
├── uploads/
├── logs/
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md

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
psql -U postgres
CREATE DATABASE library_booking;
\q
4. Configure environment
bash
cp .env.example .env
# Update .env with your credentials
5. Start the server
bash
npm run dev
📚 Current API Endpoints
🔐 Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/auth/me	Get current user profile	✅
🏛️ Library Status
Method	Endpoint	Description	Auth
GET	/api/status	Get library open/closed status, capacity, and message	❌
🪑 Seats
Method	Endpoint	Description	Auth
GET	/api/seats/sections	Get all library sections (Computer, General, Discussion)	❌
GET	/api/seats/sections/:id/seats	Get seats by section with status	✅
GET	/api/seats/status	Get real-time seat availability	✅
📅 Bookings
Method	Endpoint	Description	Auth
POST	/api/bookings	Create booking (max 5 seats)	✅
GET	/api/bookings/my	Get user's bookings	✅
GET	/api/bookings/:id	Get single booking details	✅
DELETE	/api/bookings/:id/cancel	Cancel a booking	✅
📖 How Each Endpoint Works
🔐 Authentication
POST /api/auth/register — Creates a new user with email and password. Phone is optional.

POST /api/auth/login — Verifies credentials and returns a JWT token for authenticated requests.

GET /api/auth/me — Returns the logged-in user's profile using the JWT token.

🏛️ Library Status
GET /api/status — Returns the current library state (open/full/closed/maintenance), capacity used/total, open hours, and any admin message.

🪑 Seats
GET /api/seats/sections — Returns all active library sections with capacity and price per seat.

GET /api/seats/sections/:id/seats — Returns all seats in a given section with seat label, position, and status (available/booked/deactivated).

GET /api/seats/status — Returns total, available, and booked seat counts plus occupancy percentage.

📅 Bookings
POST /api/bookings — Creates a booking for up to 5 seats. Requires booking_date, an array of seat IDs, and an array of occupant names. Marks selected seats as booked and sets a 15-minute expiry.

GET /api/bookings/my — Returns all bookings for the logged-in user, including seat and occupant details.

GET /api/bookings/:id — Returns a single booking by ID (only if it belongs to the logged-in user).

DELETE /api/bookings/:id/cancel — Cancels a booking and releases the seats back to available.

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
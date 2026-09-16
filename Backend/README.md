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
git clone https://github.com/alibuprojectLTS/library-seat-booking-system.git
cd library-seat-booking-system/Backend

2. Install dependencies
npm install

3. Set up PostgreSQL
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


🎯 COMPLETE SYSTEM FLOW
1. Public Home Page (No Login)
A visitor accesses the system and sees a public home page featuring a navigation bar with logo, Home, Book Seats, About, and Contact links, along with Login and Register buttons. The page displays announcements posted by administrators, real-time library status showing open/closed state, capacity utilization, availability per section, open hours, and any admin messages. The how-to-use section guides visitors through the four-step booking process: register, select seats, pay online, and receive tickets. There is also a newsletter subscription section, partners section, and a footer with address and social media links. Importantly, the interactive seat map is not shown on the public home page — users can only see general section information until they log in.

2. Registration / Login
When a visitor decides to book, they click Login or Register. New users register using email and password or Google OAuth, while returning users login using email/password or Google. The system verifies credentials, checks the user role, and generates a JWT token. Users with role user are redirected to their User Dashboard, while users with role admin are redirected to the Admin Dashboard.

3. User Dashboard
The user dashboard shows statistics including total bookings, active tickets, total amount spent, and upcoming bookings. It also displays today's active tickets with details and quick actions such as booking new seats, viewing all tickets, editing profile, submitting support queries, and viewing notifications.

4. Interactive Seat Map & Booking
From the dashboard, the logged-in user clicks Book Seats to access the interactive seat map. The seat map shows three sections (Computer, General, Discussion) with color-coded seats: green (available), red (booked), and grey (deactivated). The user selects up to 5 seats, enters occupant names for each seat, reviews the booking summary showing section, seat numbers, occupant names, booking date, and total amount, then confirms and proceeds to payment.

5. Payment & Confirmation
The user is redirected to PayChangu secure payment. Upon successful payment, the system automatically generates a unique ticket code with a QR code, sends an email receipt with booking details to the user's registered email address, creates an in-app notification, and redirects to a confirmation page. The user can view all tickets in their dashboard, which displays statistics, active tickets, and upcoming bookings.

6. Library Entry / Check-In
When the user arrives at the library, they present their ticket either by showing the email receipt on their phone, displaying the ticket from their dashboard, or providing a printed copy. Library staff verify the ticket using either QR code scanning (which automatically validates the booking and checks the user in) or manual search in the admin dashboard using the user's name, seat number, or booking ID. Once verified, the staff confirms check-in, the seat status updates to occupied, and the user proceeds to their booked seat. When leaving, the staff checks the user out, making the seat available again.

7. Admin Dashboard
Administrators login through the same login page and are redirected to the admin dashboard based on their role. The admin dashboard provides live statistics and quick actions for managing seats manually or through CSV upload, managing users by deleting those inactive for over seven days, posting announcements that appear on the home page, updating library status that instantly reflects on the home page, managing queries by replying and changing status, processing refunds, and accessing reports on peak hours, revenue, seat popularity, no-shows, and user activity.

8. Query & Support System
Users submit queries through their dashboard by providing subject, category, priority, and message. Admins view, filter, and reply to queries, changing status as issues are resolved. Users receive email notifications when their queries are replied to and can view complete conversations in their support section. Admins can also add internal notes not visible to users.

9. Announcements & Library Status
Admins create announcements (general, urgent, holiday, maintenance, promotional) and update library status (open, full, closed, maintenance). These instantly reflect on the public home page and are visible to all visitors.

📚 API Endpoints
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
💳 Payments
Method	Endpoint	Description	Auth
POST	/api/payments/initiate	Initiate PayChangu payment	✅
GET	/api/payments/verify/:txRef	Verify payment status	✅
GET	/api/payments/history	Get user's payment history	✅
POST/GET	/api/payments/webhook	PayChangu webhook callback	❌
🎫 Tickets
Method	Endpoint	Description	Auth
GET	/api/tickets/my	Get user's tickets	✅
GET	/api/tickets/:id	Get single ticket with QR code	✅
💬 Queries
Method	Endpoint	Description	Auth
POST	/api/queries	Submit a query	✅
GET	/api/queries/my	Get user's queries	✅
👑 Admin
Method	Endpoint	Description	Auth
GET	/api/admin/dashboard	Admin dashboard stats	✅ Admin
GET	/api/admin/queries	Get all queries	✅ Admin
POST	/api/admin/queries/:id/reply	Reply to a query	✅ Admin
DELETE	/api/admin/users/inactive	Delete inactive users	✅ Admin
POST	/api/admin/announcements	Post announcement	✅ Admin
PUT	/api/admin/status	Update library status	✅ Admin
POST	/api/admin/seats	Add seat manually	✅ Admin
PUT	/api/admin/seats/:id	Update seat	✅ Admin
DELETE	/api/admin/seats/:id	Delete seat	✅ Admin
POST	/api/admin/seats/csv	Upload seats via CSV	✅ Admin
POST	/api/admin/checkin	Verify QR and check in user	✅ Admin
POST	/api/admin/checkout	Check out user	✅ Admin
GET	/api/admin/bookings/search	Search bookings by seat, occupant, or user	✅ Admin
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

💳 Payments
POST /api/payments/initiate — Starts a PayChangu payment session and returns the checkout URL.

GET /api/payments/verify/:txRef — Verifies the payment with PayChangu, updates booking status to paid, generates a ticket with QR code, and sends an email receipt.

GET /api/payments/history — Returns the user's payment history.

POST/GET /api/payments/webhook — Handles PayChangu webhook notifications for automatic payment processing.

🎫 Tickets
GET /api/tickets/my — Returns all tickets belonging to the logged-in user with QR codes.

GET /api/tickets/:id — Returns a single ticket with its QR code.

💬 Queries
POST /api/queries — Submits a support query with subject, message, category, and priority.

GET /api/queries/my — Returns all queries submitted by the logged-in user.

👑 Admin
GET /api/admin/dashboard — Returns aggregated stats: total users, seats, bookings, pending queries, and inactive users.

GET /api/admin/queries — Returns all queries, filterable by status and priority.

POST /api/admin/queries/:id/reply — Sends a reply to a query and updates its status.

DELETE /api/admin/users/inactive — Deactivates users who haven't logged in for 7+ days.

POST /api/admin/announcements — Posts a new announcement visible on the home page.

PUT /api/admin/status — Updates library status and message shown on the home page.

POST /api/admin/seats — Adds a seat manually.

PUT /api/admin/seats/:id — Updates seat details.

DELETE /api/admin/seats/:id — Deletes a seat.

POST /api/admin/seats/csv — Uploads seats via CSV file.

POST /api/admin/checkin — Verifies a ticket by QR code and checks the user in.

POST /api/admin/checkout — Checks the user out and releases the seat.

GET /api/admin/bookings/search — Searches bookings by seat label, occupant name, booking ID, or user email.

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
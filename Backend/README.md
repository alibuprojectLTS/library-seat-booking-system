Blantyre Regional Branch Library e-ticketing system - Backend API
A robust RESTful API for managing library seat bookings, POS cash tickets, check-ins, and financial reporting. Built with Node.js, Express, and PostgreSQL.

🚀 Tech Stack
Technology	Purpose
Node.js	Runtime Environment
Express.js	Web Framework
PostgreSQL	Database
Sequelize	ORM
JWT	Authentication
Brevo API	Email Delivery
PayChangu	Online Payments
Swagger	API Documentation
Docker	Containerization
---

## 🚀 Tech Stack

| **Technology** | **Purpose** |
|----------------|-------------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| PostgreSQL | Database |
| Sequelize | ORM |
| JWT | Authentication |
| Brevo API | Email Delivery |
| PayChangu | Online Payments |
| Swagger | API Documentation |
| Docker | Containerization |

---

## 📁 Project Structure

Backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── adminController.js        # UPDATED: User toggle, Audit, Bookings
│   │   ├── announcementController.js
│   │   ├── authController.js
│   │   ├── bookingController.js      # UPDATED: Dynamic pricing, Electricity, History delete
│   │   ├── csvController.js
│   │   ├── financeController.js      # NEW: Reports, Refunds
│   │   ├── paymentController.js
│   │   ├── queryController.js
│   │   ├── seatController.js
│   │   ├── staffController.js        # NEW: POS, Check-in (blocks cancelled)
│   │   ├── statusController.js
│   │   ├── ticketController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── admin.js
│   │   ├── auth.js                   # UPDATED: isStaff, isFinance
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Announcement.js
│   │   ├── Booking.js                # UPDATED: payment_method, add_electricity
│   │   ├── BookingItem.js
│   │   ├── LibrarySection.js
│   │   ├── LibraryStatus.js
│   │   ├── NewsletterSubscription.js
│   │   ├── Notification.js
│   │   ├── Payment.js
│   │   ├── Query.js
│   │   ├── QueryReply.js
│   │   ├── Seat.js
│   │   ├── Ticket.js                 # UPDATED: checked_in, is_valid
│   │   └── User.js                   # UPDATED: staff, finance roles
│   ├── routes/
│   │   ├── index.js                  # UPDATED: staff, finance
│   │   ├── adminRoutes.js
│   │   ├── announcementRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── financeRoutes.js          # NEW
│   │   ├── paymentRoutes.js
│   │   ├── queryRoutes.js
│   │   ├── seatRoutes.js
│   │   ├── staffRoutes.js            # NEW
│   │   ├── statusRoutes.js
│   │   ├── ticketRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── csvService.js
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   ├── paymentService.js
│   │   └── qrService.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── logger.js
│   │   └── response.js
│   └── index.js

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
# EMAIL CONFIGURATION (Brevo)
# ============================================================
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_email@gmail.com

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


COMPLETE SYSTEM FLOW
1. Public Home Page (No Login)
A visitor accesses the public home page featuring the new NLS branding, live stats, and hero section. The announcements bar displays notices, and the library status section shows real-time info (Open/Closed/Full/Maintenance). Users can view sections but must log in to book.

2. Registration / Login
Users register/login via email. The system verifies credentials and redirects based on role:

user → User Dashboard

admin → Admin Dashboard

staff → Staff POS & Check-in Dashboard

finance → Financial Reports Dashboard

3. Online Booking (User)
Users select seats (across multiple sections in one session), choose if they need Electricity (+400 MWK), review the summary, and pay via PayChangu. The backend dynamically calculates the price based on the section price + electricity. Upon payment, a ticket with a QR code is generated and emailed to the user.

4. Point of Sale / Cash Ticketing (Staff)
Library staff log into the Staff Dashboard and use the POS Portal. They select seats on the map, enter the occupant's name and email, add Electricity if needed, and confirm cash received. The system generates a paid ticket and emails it immediately without calling PayChangu.

5. Check-In (Staff)
When a user arrives, staff use the Check-In portal. They can search by ticket number or scan the QR code. Once verified, they click check-in. If a booking was cancelled or refunded, the backend blocks it.

6. Financial Reports (Finance Officer)
The Financial Officer logs in to view daily, weekly, and monthly revenue reports, separated by Online (PayChangu) and Cash (POS) payments. They can export the reports or process refunds.

7. Admin Management (Admin)
The Administrator manages the system: seating (CRUD), pricing, user toggling (activate/deactivate), announcements, library status, and viewing booking history (including Check-In status).

📚 API Endpoints
🔐 Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register user	❌
POST	/api/auth/login	Login user	❌
GET	/api/auth/me	Get current user	✅
🪑 Seats & Sections
Method	Endpoint	Description	Auth
GET	/api/seats/sections	Get active sections	❌
GET	/api/seats/sections/:id/seats	Get seats by section	✅
📅 Bookings
Method	Endpoint	Description	Auth
POST	/api/bookings	Create booking (Dynamic Price + Electricity)	✅ User
GET	/api/bookings/my	Get user's bookings	✅ User
DELETE	/api/bookings/:id/cancel	Cancel booking	✅ User
DELETE	/api/bookings/:id/history	Permanently delete past booking	✅ User
🧾 Staff (POS & Check-In)
Method	Endpoint	Description	Auth
POST	/api/staff/pos-booking	Create cash booking & issue ticket	✅ Staff
POST	/api/staff/checkin	Verify and check-in (blocks cancelled)	✅ Staff
GET	/api/staff/bookings	View all bookings	✅ Staff
GET	/api/staff/queries	View user queries	✅ Staff
💰 Finance
Method	Endpoint	Description	Auth
GET	/api/finance/reports	Get revenue reports (Daily/Weekly/Monthly)	✅ Finance
POST	/api/finance/refund	Process a refund	✅ Finance
👑 Admin
Method	Endpoint	Description	Auth
GET	/api/admin/dashboard	Admin metrics	✅ Admin
GET	/api/admin/bookings/search	View bookings + Check-In status	✅ Admin
DELETE	/api/admin/bookings/:id/cancel	Cancel any booking	✅ Admin
GET	/api/admin/users	View all users	✅ Admin
PUT	/api/admin/users/:id/toggle	Toggle user active status	✅ Admin
GET/POST/PUT/DELETE	/api/admin/announcements	Full Announcement CRUD	✅ Admin
PUT	/api/admin/status	Update library status	✅ Admin
POST/PUT/DELETE	/api/admin/seats	Full Seat CRUD	✅ Admin
POST	/api/admin/seats/csv	Bulk CSV upload	✅ Admin
GET/PUT	/api/admin/sections	View & Update Section Prices	✅ Admin

🐳 Docker Setup
Start with Docker Compose

bash
docker-compose up -d
Stop containers

bash
docker-compose down
📋 Credentials
Email	Password	Role
admin@library.com	FGBROC	Admin
staff@library.com	(set in DB)	Staff
finance@library.com	(set in DB)	Finance
(Note: To create Staff and Finance accounts, update the role column in the users table for those specific users).

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
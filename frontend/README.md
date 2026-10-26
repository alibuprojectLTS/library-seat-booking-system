Blantyre Regional Branch Library e-ticketing system - Frontend
A modern React + TypeScript frontend for the NLS e-ticketing system, built with Vite, Tailwind CSS, and React Router.

🚀 Tech Stack
Technology	Purpose
React	UI Library
TypeScript	Type Safety
Vite	Build Tool
React Router	Routing
Tailwind CSS	Styling
Axios	API Calls
Font Awesome	Icons
Lucide React	Home page icons
Recharts	Charts
React Hot Toast	Notifications
HTML5-QRCode	Camera QR Scanning

## 📁 Project Structure
frontend/
├── src/
│   ├── api/                                    # API calls
│   │   ├── admin/
│   │   │   ├── announcementApi.ts              # Admin announcements CRUD
│   │   │   ├── dashboardApi.ts                 # Admin stats
│   │   │   ├── pricingApi.ts                   # Price Management (New)
│   │   │   ├── seatApi.ts                      # Admin seat CRUD
│   │   │   ├── statusApi.ts                    # Library status update
│   │   │   └── userApi.ts                      # Manage users (New)
│   │   ├── announcements/
│   │   │   └── announcementApi.ts              # Public announcements
│   │   ├── auth/
│   │   │   └── authApi.ts                      # Login, register, me
│   │   ├── bookings/
│   │   │   └── bookingApi.ts                   # Booking create/get/cancel
│   │   ├── core/
│   │   │   └── apiClient.ts                    # Axios instance + JWT
│   │   ├── payments/
│   │   │   └── paymentApi.ts                   # Payment initiate/verify
│   │   ├── queries/
│   │   │   └── queryApi.ts                     # User queries
│   │   ├── seats/
│   │   │   └── seatApi.ts                      # Sections + seats
│   │   ├── status/
│   │   │   └── statusApi.ts                    # Library status
│   │   └── tickets/
│   │       └── ticketApi.ts                    # User tickets
│   │
│   ├── assets/
│   │   └── images/                             # Static images
│   │
│   ├── auth/                                   # Auth logic
│   │   ├── AuthContext.tsx                     # User type + context
│   │   ├── AuthProvider.tsx                    # Bootstrap + provide
│   │   └── ProtectedRoute.tsx                  # Route guard by role
│   │
│   ├── components/                             # Reusable UI
│   │   ├── Alert.tsx
│   │   ├── AnimatedBackground.tsx              # Login-style bg
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   └── Navbar.tsx                          # Home Navbar + Top Status Banner
│   │
│   ├── config/
│   │   └── constants.ts                        # API URL, keys, roles
│   │
│   ├── features/                               # Feature modules
│   │   ├── auth/
│   │   │   ├── Login.tsx                       # Redirects by role
│   │   │   └── Register.tsx
│   │   ├── dashboards/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx          # 9 live stats
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   └── pages/
│   │   │   │       ├── Announcements.tsx       # ✅ Full CRUD
│   │   │   │       ├── CSVUpload.tsx           # ✅ Bulk Upload
│   │   │   │       ├── LibraryStatus.tsx       # ✅ Update Status
│   │   │   │       ├── ManageBookings.tsx      # ✅ Cancel Bookings (New)
│   │   │   │       ├── ManagePricing.tsx       # ✅ Update Prices (New)
│   │   │   │       ├── ManageSeats.tsx         # ✅ Seat CRUD
│   │   │   │       └── ManageUsers.tsx         # ✅ View Users (New)
│   │   │   │
│   │   │   ├── staff/                          # ✅ NEW STAFF PANEL
│   │   │   │   ├── StaffLayout.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── StaffSidebar.tsx
│   │   │   │   │   └── StaffTopbar.tsx
│   │   │   │   └── pages/
│   │   │   │       ├── POS.tsx                 # ✅ Cash Point of Sale
│   │   │   │       └── CheckIn.tsx             # ✅ QR Check-In
│   │   │   │
│   │   │   ├── finance/                        # ✅ NEW FINANCE PANEL
│   │   │   │   ├── FinanceLayout.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── FinanceSidebar.tsx
│   │   │   │   │   └── FinanceTopbar.tsx
│   │   │   │   └── pages/
│   │   │   │       └── Reports.tsx             # ✅ Daily/Weekly/Monthly
│   │   │   │
│   │   │   └── user/
│   │   │       ├── UserDashboard.tsx           # User overview
│   │   │       ├── UserLayout.tsx
│   │   │       └── pages/
│   │   │           ├── UserBookings.tsx        # ✅ Cancelled hidden
│   │   │           ├── UserProfile.tsx
│   │   │           └── UserTickets.tsx         # ✅ No Delete button
│   │   │
│   │   ├── home/
│   │   │   ├── Home.tsx                        # Home page
│   │   │   └── components/
│   │   │       ├── AnnouncementsBar.tsx        # ✅ Live from admin
│   │   │       ├── ContactSection.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Hero.tsx
│   │   │       ├── HowToUse.tsx                # ✅ How to buy ticket
│   │   │       ├── LibrarySections.tsx         # ✅ Live seat counts
│   │   │       ├── LibraryStatus.tsx           # ✅ Live status
│   │   │       ├── Newsletter.tsx
│   │   │       ├── Partners.tsx
│   │   │       └── Stats.tsx                   # ✅ Live counters
│   │   │
│   │   ├── payments/
│   │   │   ├── PaymentPage.tsx                 # Pay with PayChangu
│   │   │   └── components/
│   │   │       ├── PaymentCancel.tsx
│   │   │       └── PaymentSuccess.tsx
│   │   │
│   │   ├── queries/
│   │   │   ├── Queries.tsx                     # Support page
│   │   │   └── components/
│   │   │       └── QueryCard.tsx
│   │   │
│   │   ├── seats/
│   │   │   ├── SeatMap.tsx                     # Interactive map
│   │   │   └── components/
│   │   │       ├── Seat.tsx
│   │   │       ├── SeatLegend.tsx
│   │   │       └── SectionTabs.tsx
│   │   │
│   │   └── tickets/
│   │       ├── MyTickets.tsx
│   │       └── TicketCard.tsx                  # ✅ QR + Issued time
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── App.tsx                                 # Main app + routes
│   ├── index.css                               # Tailwind
│   └── main.tsx                                # Entry point
│
├── .env                                        # VITE_API_URL
├── package.json
├── tailwind.config.js
└── vite.config.ts

## 🔐 Environment Variables

Create a .env file in the root directory:

env
VITE_API_URL=http://localhost:5000/api
🚀 Installation & Setup
1. Install dependencies
cd frontend
npm install
2. Start the dev server
bash
npm run dev
Frontend runs at: http://localhost:5173
📋 Common Commands
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint

🚀 Deployment
The frontend is deployed on Vercel with automatic continuous deployment from GitHub.

Service	Provider	URL
Frontend	Vercel	https://your-vercel-url.vercel.app
Backend API	Render	https://libraryseat-api.onrender.com
Database	Neon (PostgreSQL)	(serverless)
Deployment Steps (Vercel)
Sign up on Vercel with GitHub.

Continuous Deployment
Every push to the main branch automatically triggers a new deployment on Vercel. The backend on Render redeploys via its own auto-deploy hook. No manual steps are needed after the initial setup.

Click Add New → Project and import library-seat-booking-system.

Set Root Directory to frontend.

Framework preset is auto-detected as Vite.

Add environment variable:

SPA Routing Fix
A vercel.json file at the root of frontend/ ensures all routes fall back to index.html so that React Router handles client-side routing:

json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}


VITE_API_URL = https://libraryseat-api.onrender.com/api

Click Deploy.

Continuous Deployment
Every push to the main branch automatically triggers a new deployment on Vercel. The backend on Render redeploys via its own auto-deploy hook. No manual steps are needed after the initial setup.

SPA Routing Fix
A vercel.json file at the root of frontend/ ensures all routes fall back to index.html so that React Router handles client-side routing:

json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
⚠️ ACTION REQUIRED
Replace https://your-vercel-url.vercel.app with your actual Vercel URL.

To find your real URL:

Go to https://vercel.com/dashboard

Click your project

CCOMPLETE SYSTEM FLOW
1. Public Home Page (No Login)
A visitor accesses the public home page featuring the new NLS branding, Top Status Banner (Open/Closed/Full/Maintenance), and live stats. The announcements bar displays notices, and the library status section shows real-time info. Users can view sections but must log in to book.

2. Registration / Login
Users register/login via email. The system verifies credentials and redirects based on role:

user → User Dashboard

admin → Admin Dashboard

staff → Staff POS & Check-in Dashboard

finance → Financial Reports Dashboard

3. Online Booking (User)
Users select seats (across multiple sections in one session), review the summary, and pay via PayChangu. Upon payment, a ticket with a QR code is generated and emailed to the user. (Note: Users can no longer delete tickets or enter occupant names).

4. Point of Sale / Cash Ticketing (Staff)
Library staff log into the Staff Dashboard and use the POS Portal. They select seats on the map, enter the occupant's name and email, and confirm cash received. The system generates a paid ticket and emails it immediately without calling PayChangu.

5. Check-In (Staff)
When a user arrives, staff use the Check-In portal. They can scan the QR code using the camera or type the ticket number. Once verified, they click check-in, which marks the ticket as checked_in in the database.

6. Financial Reports (Finance Officer)
The Financial Officer logs in to view daily, weekly, and monthly revenue reports, separated by Online (PayChangu) and Cash (POS) payments.

7. Admin Management (Admin)
The Administrator manages the entire system:

Manage Seats: Add, edit, or delete seats.

Manage Bookings: View all bookings and cancel any ticket/booking if needed.

Price Management: Update the cost per seat for each library section.

Manage Users: View all registered users.

Announcements & Library Status: Update the public home page instantly.

🎯 New Features (Supervisor Updates)
Top Status Banner: Added to the Navbar. Shows live state and hours.

"Buy Ticket" Button: Now hides if the library is not OPEN.

Multi-Section Selection: Users can select seats across sections in one go.

No Occupant Names: Removed from User booking flow.

No Ticket Deletion: Users can no longer delete tickets from "My Tickets".

Staff POS: A portal for Library Staff to process cash payments.

Staff Check-In: QR Camera scanner and manual verification.

Finance Dashboard: Real-time revenue tracking for the Financial Officer.

📄 License
MIT

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS





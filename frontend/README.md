Library Seat Booking System - Frontend
A modern React + TypeScript frontend for the Library Seat Booking System, built with Vite, Tailwind CSS, and React Router.



Tech Stack
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

## 📁 Project Structure
frontend/
├── src/
│   ├── api/                                    # API calls
│   │   ├── admin/
│   │   │   ├── announcementApi.ts              # Admin announcements CRUD
│   │   │   ├── checkinApi.ts                   # QR check-in (in progress)
│   │   │   ├── dashboardApi.ts                 # Admin stats
│   │   │   ├── queryApi.ts                     # Manage queries (in progress)
│   │   │   ├── seatApi.ts                      # Admin seat CRUD
│   │   │   ├── statusApi.ts                    # Library status update
│   │   │   └── userApi.ts                      # Manage users (in progress)
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
│   │   └── images/
│   │       ├── about-hero.jpg
│   │       ├── auth-side-art.jpg
│   │       ├── computer-section.jpg
│   │       ├── discussion-section.jpg
│   │       ├── general-section.jpg
│   │       ├── home1-hero.jpg
│   │       ├── home-hero.jpg
│   │       └── seats-hero.jpg
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
│   │   └── Navbar.tsx
│   │
│   ├── config/
│   │   └── constants.ts                        # API URL, keys, roles
│   │
│   ├── features/                               # Feature modules
│   │   ├── about/
│   │   │   └── About.tsx
│   │   ├── auth/
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── bookings/
│   │   │   ├── BookingSummary.tsx              # Occupant names + review
│   │   │   ├── OccupantForm.tsx
│   │   │   └── hooks/
│   │   │       └── useBookings.ts
│   │   ├── contact/
│   │   │   └── Contact.tsx                     # Full contact page
│   │   ├── dashboards/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx          # Admin overview
│   │   │   │   ├── AdminLayout.tsx             # Admin shell
│   │   │   │   ├── components/
│   │   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   │   └── AdminTopbar.tsx
│   │   │   │   └── pages/
│   │   │   │       ├── AdminProfile.tsx        # In progress
│   │   │   │       ├── Announcements.tsx       # ✅ Full CRUD
│   │   │   │       ├── CheckIn.tsx             # In progress
│   │   │   │       ├── CSVUpload.tsx           # ✅ Working
│   │   │   │       ├── LibraryStatus.tsx       # ✅ Working
│   │   │   │       ├── ManageQueries.tsx       # In progress
│   │   │   │       ├── ManageSeats.tsx         # ✅ Full CRUD
│   │   │   │       └── ManageUsers.tsx         # In progress
│   │   │   └── user/
│   │   │       ├── UserDashboard.tsx           # User overview
│   │   │       ├── UserLayout.tsx              # User shell
│   │   │       ├── components/
│   │   │       │   ├── UserSidebar.tsx
│   │   │       │   └── UserTopbar.tsx
│   │   │       └── pages/
│   │   │           ├── UserBookings.tsx        # ✅ Cancelled hidden
│   │   │           ├── UserProfile.tsx
│   │   │           └── UserTickets.tsx         # ✅ Real delete
│   │   ├── home/
│   │   │   ├── Home.tsx                        # Home page
│   │   │   └── components/
│   │   │       ├── AnnouncementsBar.tsx        # ✅ Live from admin
│   │   │       ├── ContactSection.tsx          # Mini contact on home
│   │   │       ├── Footer.tsx
│   │   │       ├── Hero.tsx                    # Carousel hero
│   │   │       ├── HowToUse.tsx
│   │   │       ├── LibrarySections.tsx         # ✅ Live seat counts
│   │   │       ├── LibraryStatus.tsx           # ✅ Live status
│   │   │       ├── Newsletter.tsx
│   │   │       ├── Partners.tsx                # Marquee
│   │   │       └── Stats.tsx                   # ✅ Live counters
│   │   ├── payments/
│   │   │   ├── PaymentPage.tsx                 # Pay with PayChangu
│   │   │   └── components/
│   │   │       ├── PaymentCancel.tsx
│   │   │       ├── PaymentStatus.tsx
│   │   │       └── PaymentSuccess.tsx
│   │   ├── queries/
│   │   │   ├── Queries.tsx                     # Support page
│   │   │   └── components/
│   │   │       └── QueryCard.tsx               # ✅ Delete + replies
│   │   ├── seats/
│   │   │   ├── SeatMap.tsx                     # Interactive map
│   │   │   ├── components/
│   │   │   │   ├── Seat.tsx
│   │   │   │   ├── SeatLegend.tsx
│   │   │   │   └── SectionTabs.tsx
│   │   │   └── hooks/
│   │   │       └── useSeats.ts
│   │   └── tickets/
│   │       ├── MyTickets.tsx
│   │       ├── TicketCard.tsx                  # ✅ Issued time + delete modal
│   │       └── components/
│   │           └── QRCode.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                          # Auth hook
│   │   └── useLocalStorage.ts
│   │
│   ├── utils/
│   │   ├── formatters.ts                       # Date/currency format
│   │   ├── helpers.ts
│   │   └── validators.ts                       # Email/password rules
│   │
│   ├── App.tsx                                 # Main app + routes
│   ├── index.css                               # Tailwind + animations
│   └── main.tsx                                # Entry point
│
├── public/                                     # Static assets
├── .env                                        # VITE_API_URL
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── index.html

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

Copy the URL shown under Domains
Features
Public Home Page (No Login)
The Library Seat Booking System includes a complete public home page featuring:

Hero carousel with rotating slides and CTAs

Live animated statistics — total seats, library sections, bookings made, and hours weekly (all fetched from the backend, real-time)

Announcements bar — driven directly by admin announcements, auto-filters expired ones

Live library status section — shows open/full/closed/maintenance state with capacity utilization percentage, open hours, and custom admin message; updates instantly when admin changes it

Four-step how-to-use guide — register, select seat, pay online, get ticket

Live library section cards — fetch from the database showing each section's actual seat count, price per seat, and a "View live availability" link

Newsletter subscription — email capture

Mini contact section and full contact page

Scrolling partners marquee — with a beautiful animated partner strip

Full footer with address, phone, email, and social links

Authentication
Authentication is fully implemented with:

Email and password login

Registration with validation

JWT token management with axios interceptors

Protected routes with role-based access control (user / admin)

Session expiry handling with a re-login prompt

User Dashboard
Once logged in, users access a personal dashboard with:

Overview statistics cards (bookings, tickets, total spent — paid bookings only)

Seven-day booking trend line chart (paid only)

Payment status pie chart (paid / pending / cancelled breakdown)

Quick action buttons — Book a seat, My tickets, My bookings, Submit query

Latest announcements — shows 3 most recent

Interactive Seat Map
The seat map allows users to:

Browse three library sections with color-coded seats — green (available), red (booked), grey (deactivated)

Select up to five seats with real-time validation

View prices per section

Beautifully animated background for consistency

Booking Flow
The booking flow includes:

Booking summary page — review selected seats, enter occupant names, pick a booking date

Automatic total amount calculation

Seamless redirect to PayChangu checkout

Payment Integration
Payment is fully integrated with PayChangu:

Users initiate payments and complete on the PayChangu checkout page

Success/cancel confirmation screens

Automated email receipts with QR code tickets once payment is verified

Real-time verification on return

User Bookings & Tickets
User bookings page — lists bookings with section, seat labels, total, status; cancelled bookings hidden; cancel modal for active ones

User tickets page — displays valid tickets with QR codes, issued timestamp, custom delete modal for real DB deletion, and auto-hides tickets older than 2 days

Download QR code as PNG

Support / Queries
Submit query with subject, category (matching backend enum), priority, and message

View admin replies — including sender name and role

Delete own query with custom confirmation modal

Filter tabs — All / Pending / In Progress / Resolved / Closed

User Profile
Account information in a clean banner layout with info cards

Toast Notifications
React Hot Toast provides beautiful toast notifications for all user actions including seat selection, payment initiation, cancellation, ticket deletion, query submission, and errors.

Reusable Components
A reusable AnimatedBackground component is used across public and booking pages for visual consistency.

Admin Dashboard
Administrators access a dedicated admin dashboard through the same login page, landing on an overview page with:

Nine live metric cards — Total Users, Total Seats, Today's Bookings, Pending Queries, Available Seats, Booked Seats, Total Bookings (paid only), Total Revenue (sum of paid bookings), Inactive Users

Six quick actions — Manage Seats, View Queries, Manage Users, Post Announcement, Library Status, CSV Upload

Admin Pages (Completed)
✅ Manage Seats — Full CRUD (add/edit/delete seat per section) with section tabs, status badges, and confirmation modals

✅ CSV Upload — Bulk add seats via CSV with file validation, preview, and success summary (added / skipped / validation errors)

✅ Announcements — Full CRUD (post/edit/delete) with type (general/urgent/holiday/maintenance/promotional), priority (normal/high/urgent), pinned toggle, and expiry date; changes reflect on home page instantly

✅ Library Status — Edit open/full/closed/maintenance state, capacity used/total, message, and open hours with a live preview panel showing exactly how it will appear on the home page

Admin Pages (In Progress)
⏳ Manage Queries — View/reply to user queries

⏳ Manage Users — Delete inactive users (7+ days)

⏳ Check-In — QR code scan and manual booking search for library staff

⏳ Admin Profile — Admin account management

📄 License
MIT

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS

Email: alibuprojectlts@gmail.com


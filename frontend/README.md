# Library Seat Booking System - Frontend

A modern React + TypeScript frontend for the Library Seat Booking System, built with Vite, Tailwind CSS, and React Router.

---

## 🚀 Tech Stack

| **Technology** | **Purpose** |
|----------------|-------------|
| React | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool |
| React Router | Routing |
| Tailwind CSS | Styling |
| Axios | API Calls |
| Font Awesome | Icons |

---

## 📁 Project Structure
frontend/
├── src/
│   ├── api/                                    # API calls
│   │   ├── admin/
│   │   │   ├── announcementApi.ts              # Admin announcements
│   │   │   ├── checkinApi.ts                   # QR check-in
│   │   │   ├── dashboardApi.ts                 # Admin stats
│   │   │   ├── queryApi.ts                     # Manage queries
│   │   │   ├── seatApi.ts                      # Admin seat CRUD
│   │   │   ├── statusApi.ts                    # Library status update
│   │   │   └── userApi.ts                      # Manage users
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
│   │   │   │       ├── AdminProfile.tsx
│   │   │   │       ├── Announcements.tsx
│   │   │   │       ├── CheckIn.tsx
│   │   │   │       ├── CSVUpload.tsx
│   │   │   │       ├── LibraryStatus.tsx
│   │   │   │       ├── ManageQueries.tsx
│   │   │   │       ├── ManageSeats.tsx
│   │   │   │       └── ManageUsers.tsx
│   │   │   └── user/
│   │   │       ├── UserDashboard.tsx           # User overview
│   │   │       ├── UserLayout.tsx              # User shell
│   │   │       ├── components/
│   │   │       │   ├── UserSidebar.tsx
│   │   │       │   └── UserTopbar.tsx
│   │   │       └── pages/
│   │   │           ├── UserBookings.tsx
│   │   │           ├── UserProfile.tsx
│   │   │           └── UserTickets.tsx
│   │   ├── home/
│   │   │   ├── Home.tsx                        # Home page
│   │   │   └── components/
│   │   │       ├── AnnouncementsBar.tsx
│   │   │       ├── ContactSection.tsx          # Mini contact on home
│   │   │       ├── Footer.tsx
│   │   │       ├── Hero.tsx                    # Carousel hero
│   │   │       ├── HowToUse.tsx
│   │   │       ├── LibrarySections.tsx
│   │   │       ├── LibraryStatus.tsx
│   │   │       ├── Newsletter.tsx
│   │   │       ├── Partners.tsx                # Marquee
│   │   │       └── Stats.tsx                   # Animated counters
│   │   ├── payments/
│   │   │   ├── PaymentPage.tsx                 # Pay with PayChangu
│   │   │   └── components/
│   │   │       ├── PaymentCancel.tsx
│   │   │       ├── PaymentStatus.tsx
│   │   │       └── PaymentSuccess.tsx
│   │   ├── queries/
│   │   │   ├── Queries.tsx                     # Support page
│   │   │   └── components/
│   │   │       └── QueryCard.tsx
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
│   │       ├── TicketCard.tsx
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
---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
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

Click Add New → Project and import library-seat-booking-system.

Set Root Directory to frontend.

Framework preset is auto-detected as Vite.

Add environment variable:

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
🎯 Features
Features
The Library Seat Booking System includes a complete public home page featuring a hero carousel with rotating slides, animated statistics counters, an announcements bar, a live library status section showing open/closed state and capacity utilization, a four-step how-to-use guide, library sections overview, newsletter subscription, a mini contact section, a scrolling partners marquee, and a full footer with contact details. A dedicated contact page is available with a full contact form, contact information cards, and an animated background. Authentication is fully implemented with email and password login, registration with validation, JWT token management, protected routes with role-based access control, and session expiry handling with a re-login prompt.

Once logged in, users access a personal dashboard with overview statistics cards, a seven-day booking trend line chart, a payment status pie chart, quick action buttons, and the latest announcements. The interactive seat map allows users to browse three library sections (Computer, General, and Discussion) with color-coded seats showing available, booked, and deactivated states, select up to five seats with real-time validation, and view prices per section, all within a beautifully animated background. The booking flow includes a booking summary page where users review selected seats, enter occupant names for each seat, pick a booking date, and see the total amount calculated automatically before proceeding to payment. Payment is fully integrated with PayChangu, allowing users to initiate payments, complete transactions on the PayChangu checkout page, view success or cancel confirmation screens, and receive automated email receipts with QR code tickets once payment is verified.

The user bookings page lists all bookings with section name, seat labels, total amount, and status, along with a cancel booking button that opens a styled confirmation modal before releasing the seats. The user tickets page displays all issued tickets with their QR codes and validity status. The user profile page shows account information in a clean banner layout with info cards. React Hot Toast provides beautiful toast notifications for all user actions including seat selection, payment initiation, cancellation, and errors. A reusable animated background component is used across public and booking pages for visual consistency.

Administrators access a dedicated admin dashboard through the same login page, landing on an overview page with eight live metric cards showing total users, total seats, today's bookings, pending queries, available seats, booked seats, total bookings, and inactive users, followed by six quick action buttons linking to seat management, query management, user management, announcement posting, library status updates, and CSV upload. The admin pages for managing seats, queries, users, announcements, library status, CSV upload, check-in, and profile are currently in progress and will be completed to provide full administrative control over the system.
📄 License
MIT

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS

Email: alibuprojectlts@gmail.com
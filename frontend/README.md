Blantyre Regional Branch Library e-ticketing system - Frontend
A modern React + TypeScript frontend for the NLS e-ticketing system, built with Vite, Tailwind CSS, and React Router.

Tech Stack
Technology	Purpose
React	UI Library
TypeScript	Type Safety
Vite	Build Tool
React Router	Routing
Tailwind CSS	Styling (NLS Theme + Ubuntu Font)
Axios	API Calls
Font Awesome	Icons
Lucide React	Home page icons
Recharts	Charts
React Hot Toast	Notifications
HTML5-QRCode	Camera QR Scanning
jsPDF	PDF Exports

## 📁 Project Structure
frontend/
├── src/
│   ├── api/                                    # API calls
│   │   ├── admin/
│   │   │   ├── announcementApi.ts              
│   │   │   ├── dashboardApi.ts                 
│   │   │   ├── pricingApi.ts                   
│   │   │   ├── seatApi.ts                      
│   │   │   ├── statusApi.ts                    
│   │   │   └── userApi.ts                      
│   │   ├── announcements/
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── core/
│   │   ├── payments/
│   │   ├── queries/
│   │   ├── seats/
│   │   ├── status/
│   │   └── tickets/
│   │
│   ├── assets/
│   │   └── images/                             
│   │
│   ├── auth/                                   # Auth logic
│   │   ├── AuthContext.tsx                     
│   │   ├── AuthProvider.tsx                    
│   │   └── ProtectedRoute.tsx                  
│   │
│   ├── components/                             # Reusable UI
│   │   ├── Alert.tsx
│   │   ├── AnimatedBackground.tsx              
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   └── Navbar.tsx                          
│   │
│   ├── config/
│   │   └── constants.ts                        
│   │
│   ├── features/                               # Feature modules
│   │   ├── about/
│   │   │   └── About.tsx                       # ✅ NLS About Story
│   │   ├── auth/
│   │   │   ├── Login.tsx                       # ✅ Redirects by role
│   │   │   └── Register.tsx
│   │   ├── dashboards/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx          # ✅ 8 live stats (No Revenue)
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   └── pages/
│   │   │   │       ├── AdminProfile.tsx        # ✅ Added
│   │   │   │       ├── Announcements.tsx       
│   │   │   │       ├── AuditTrail.tsx          # ✅ NEW: User Login Audit
│   │   │   │       ├── CSVUpload.tsx           
│   │   │   │       ├── LibraryStatus.tsx       
│   │   │   │       ├── ManageBookings.tsx      # ✅ Filters + Check-In Status
│   │   │   │       ├── ManagePricing.tsx       
│   │   │   │       ├── ManageSeats.tsx         
│   │   │   │       └── ManageUsers.tsx         # ✅ Toggle Status (Active/Inactive)
│   │   │   │
│   │   │   ├── staff/                          
│   │   │   │   ├── StaffLayout.tsx
│   │   │   │   ├── components/
│   │   │   │   └── pages/
│   │   │   │       ├── StaffBookings.tsx       # ✅ NEW: View Bookings
│   │   │   │       ├── POS.tsx                 # ✅ Cash + Electricity
│   │   │   │       ├── CheckIn.tsx             # ✅ QR Scanner
│   │   │   │       └── StaffQueries.tsx        # ✅ Reply to users
│   │   │   │
│   │   │   ├── finance/                        
│   │   │   │   ├── FinanceLayout.tsx
│   │   │   │   ├── components/
│   │   │   │   └── pages/
│   │   │   │       └── Reports.tsx             # ✅ Bar Chart + Refunds + PDF
│   │   │   │
│   │   │   └── user/
│   │   │       ├── UserDashboard.tsx           # ✅ Active Bookings logic
│   │   │       ├── UserLayout.tsx
│   │   │       └── pages/
│   │   │           ├── UserBookings.tsx        # ✅ Active/History tabs + Delete History
│   │   │           ├── UserProfile.tsx
│   │   │           └── UserTickets.tsx         
│   │   │
│   │   ├── home/
│   │   │   ├── Home.tsx                        
│   │   │   └── components/
│   │   │       ├── AnnouncementsBar.tsx        
│   │   │       ├── Footer.tsx                  # ✅ NLS Colors
│   │   │       ├── Hero.tsx                    # ✅ Carousel + Story + Stats
│   │   │       ├── HowToUse.tsx                # ✅ "Buy a Ticket" (includes POS)
│   │   │       ├── LibrarySections.tsx         # ✅ Only 2 sections
│   │   │       ├── LibraryStatus.tsx           
│   │   │       ├── Newsletter.tsx              # ✅ NLS Colors
│   │   │       ├── Partners.tsx
│   │   │       └── Stats.tsx                   
│   │   │
│   │   ├── payments/
│   │   │   ├── PaymentPage.tsx                 # ✅ Dynamic Amount
│   │   │   └── components/
│   │   │
│   │   ├── queries/
│   │   │   ├── Queries.tsx                     
│   │   │   └── components/
│   │   │
│   │   ├── seats/
│   │   │   ├── SeatMap.tsx                     
│   │   │   └── components/
│   │   │
│   │   └── tickets/
│   │       ├── MyTickets.tsx
│   │       └── TicketCard.tsx                  
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── App.tsx                                 # Main app + routes
│   ├── index.css                               # Tailwind + Font Config
│   └── main.tsx                                # Entry point
│
├── .env                                        # VITE_API_URL
├── package.json
├── tailwind.config.js                          # ✅ NLS Colors + Ubuntu Font
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

COMPLETE SYSTEM FLOW
1. Public Home Page (No Login)
A visitor accesses the public home page featuring the new NLS Deep Navy branding, Top Status Banner (Open/Closed/Full/Maintenance), Ubuntu Font, and live stats grouped inside the Hero section. The library section overview only shows General and Computer . The "How to Buy a Ticket" section now includes the POS (Cash) option.

2. Registration / Login
Users register/login via email. The system verifies credentials and redirects based on role:

user → User Dashboard

admin → Admin Dashboard

staff → Staff POS, Check-In & Bookings

finance → Financial Reports Dashboard

3. Online Booking (User)
Users select seats (across multiple sections), choose if they need Electricity (+400 MWK), review the summary, and pay via PayChangu. Upon payment, a ticket with a QR code is generated and emailed. Users cannot delete tickets. If a booking date passes, it moves to the History tab where the user can permanently delete it.

4. Point of Sale / Cash Ticketing (Staff)
Library staff log into the Staff Dashboard and use the POS Portal. They select seats on the map, enter the occupant's name and email, add Electricity if needed, and confirm cash received. The system dynamically calculates the real price (seat price + electricity) and emails the ticket immediately.

5. Check-In (Staff)
When a user arrives, staff use the Check-In portal. They can scan the QR code using the camera, upload an image, or type the ticket number. Once verified, they click check-in. If a booking was cancelled or refunded, the scanner blocks it with an "INVALID" message.

6. Financial Reports (Finance Officer)
The Financial Officer logs in to view Daily, Weekly, and Monthly revenue reports, complete with a Revenue Bar Chart, transaction history (including Cancelled/Refunded), PDF/CSV exports, and the ability to Process Refunds.

7. Admin Management (Admin)
The Administrator manages the entire system:

Manage Seats: Add, edit, or delete seats.

Manage Bookings: View all bookings, check if users have checked in, and cancel if needed.

Price Management: Update the cost per seat.

Manage Users: View, search, activate, or deactivate accounts. Includes an Audit Trail to track last logins.

Announcements & Library Status: Update the public home page instantly.

🎯 New Features 
Top Status Banner: Added to the Navbar. Shows live state and hours.

NLS Font & Colors: App uses Ubuntu font and Deep Navy (#082845) / Medium Blue (#186BB1) themes.

"Buy Ticket" Button: Now hides if the library is not OPEN.

Multi-Section Selection: Users can select seats across sections in one go.

No Occupant Names (Online): Removed from User booking flow. Automatically attaches the user's name.

No Ticket Deletion: Users can no longer delete active tickets.

Electricity Add-On: Users & Staff can add MWK 400 to their booking for power.

Dynamic Pricing: Backend now calculates the real amount based on the section price + electricity
Staff POS: A portal for Library Staff to process cash payments.

Staff Check-In: QR Camera scanner, image upload, and manual verification. Blocks cancelled tickets.

Finance Dashboard: Real-time revenue tracking, Bar Chart, PDF/CSV export, and Refund processing.

User History: Bookings past their date move to a "History" tab and can be permanently deleted.

Admin Audit Trail: Admins can view the last login time of every user.

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS





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
│ ├── api/ # API calls
│ │ ├── axios.ts # Axios instance
│ │ ├── auth.ts
│ │ ├── seats.ts
│ │ ├── bookings.ts
│ │ ├── payments.ts
│ │ ├── tickets.ts
│ │ ├── queries.ts
│ │ ├── admin.ts
│ │ └── announcements.ts
│ │
│ ├── auth/ # Authentication logic
│ │ ├── AuthProvider.tsx
│ │ ├── AuthContext.tsx
│ │ └── ProtectedRoute.tsx
│ │
│ ├── components/ # Reusable UI
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ ├── Input.tsx
│ │ ├── Modal.tsx
│ │ ├── Loader.tsx
│ │ ├── Alert.tsx
│ │ └── Navbar.tsx
│ │
│ ├── config/ # App configuration
│ │ └── constants.ts
│ │
│ ├── features/ # Feature-based modules
│ │ ├── home/ # Home page
│ │ │ ├── Home.tsx
│ │ │ └── components/
│ │ │ ├── Hero.tsx
│ │ │ ├── AnnouncementsBar.tsx
│ │ │ ├── LibraryStatus.tsx
│ │ │ ├── HowToUse.tsx
│ │ │ ├── LibrarySections.tsx
│ │ │ ├── Newsletter.tsx
│ │ │ ├── Partners.tsx
│ │ │ └── Footer.tsx
│ │ │
│ │ ├── about/
│ │ │ └── About.tsx
│ │ │
│ │ ├── contact/
│ │ │ └── Contact.tsx
│ │ │
│ │ ├── auth/
│ │ │ ├── Login.tsx
│ │ │ ├── Register.tsx
│ │ │ └── ForgotPassword.tsx
│ │ │
│ │ ├── seats/
│ │ │ ├── SeatMap.tsx
│ │ │ ├── components/
│ │ │ │ ├── SectionTabs.tsx
│ │ │ │ ├── Seat.tsx
│ │ │ │ └── SeatLegend.tsx
│ │ │ └── hooks/
│ │ │ └── useSeats.ts
│ │ │
│ │ ├── bookings/
│ │ │ ├── BookingSummary.tsx
│ │ │ ├── OccupantForm.tsx
│ │ │ └── hooks/
│ │ │ └── useBookings.ts
│ │ │
│ │ ├── payments/
│ │ │ ├── PaymentPage.tsx
│ │ │ └── components/
│ │ │ └── PaymentStatus.tsx
│ │ │
│ │ ├── tickets/
│ │ │ ├── MyTickets.tsx
│ │ │ ├── TicketCard.tsx
│ │ │ └── components/
│ │ │ └── QRCode.tsx
│ │ │
│ │ ├── queries/
│ │ │ ├── Queries.tsx
│ │ │ └── components/
│ │ │ └── QueryCard.tsx
│ │ │
│ │ └── dashboards/
│ │ ├── user/
│ │ │ ├── UserDashboard.tsx
│ │ │ └── pages/
│ │ │ ├── UserProfile.tsx
│ │ │ ├── UserBookings.tsx
│ │ │ └── UserTickets.tsx
│ │ │
│ │ └── admin/
│ │ ├── AdminDashboard.tsx
│ │ └── pages/
│ │ ├── AdminProfile.tsx
│ │ ├── ManageSeats.tsx
│ │ ├── ManageQueries.tsx
│ │ ├── ManageUsers.tsx
│ │ ├── Announcements.tsx
│ │ ├── LibraryStatus.tsx
│ │ ├── CSVUpload.tsx
│ │ └── CheckIn.tsx
│ │
│ ├── hooks/ # Global custom hooks
│ │ ├── useAuth.ts
│ │ └── useLocalStorage.ts
│ │
│ ├── utils/ # Utility functions
│ │ ├── formatters.ts
│ │ ├── validators.ts
│ │ └── helpers.ts
│ │
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
│
├── public/
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts


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
🎯 Features
Feature	Description
Public Home Page	Hero, announcements, library status, how-to-use, newsletter, partners, footer
Authentication	Login, register, protected routes
Interactive Seat Map	Real-time seat availability
Booking Flow	Select up to 5 seats, occupant names, review
Payment	PayChangu integration
Tickets	QR code, email receipt
Queries	Submit and track support queries
User Dashboard	Stats, tickets, bookings, profile
Admin Dashboard	Manage seats, queries, users, announcements, CSV upload, check-in
📄 License
MIT

👨‍💻 Author
alibuprojectLTS

GitHub: @alibuprojectLTS

Email: alibuprojectlts@gmail.com
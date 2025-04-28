                                            YOGALAYER 🧘‍♂️🛍️
    An ecommerce project built from scratch with React, Node.js, Express, MongoDB, Vercel, Render, and UptimeRobot monitoring.
This project is designed, developed, deployed, and maintained with production-ready practices.

📂 Project Directory Structure
pgsql
Copy
Edit
yogalayer/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── user.js
│   ├── .env               # MongoDB URI and JWT secret (backend only)
│   ├── package.json
│   ├── server.js
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LoginModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CreateAccountPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── AddressPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   ├── App.js
│   ├── index.js
│
├── public/
│   └── favicon.ico
│
├── .env                  # VITE_API_BASE_URL for frontend
├── package.json          # frontend dependencies
├── tailwind.config.js    # styling setup
├── postcss.config.js
└── README.md             # you are reading this!
                                            
                                            🚀 Technologies Used

Tool/Service	                              Purpose
  React.js	                           Frontend (Vite-based)
Node.js + Express.js	                 Backend API server
   MongoDB Atlas	        Cloud database for users, cart, wishlist, orders
     Mongoose	                MongoDB ODM (Object Document Mapping)
      Vercel	                  Frontend hosting and Speed Insights
      Render	                           Backend hosting
    UptimeRobot	                Keeping backend "awake" during idle times
    TailwindCSS	                      Frontend styling framework
 React Hot Toast	                      Toast notifications
Vercel Speed Insights	       Real user monitoring (frontend performance)

                                            🌍 Deployment Overview

Frontend hosted on Vercel ➔ https://yogalayer.vercel.app/
Backend hosted on Render ➔ https://yogalayer-backend.onrender.com/
UptimeRobot pings the backend every 5 minutes to avoid Render "sleep" mode.
Environment Variables securely managed separately for Frontend (Vercel) and Backend (Render).

                                            
                                            📖 Major Features Built

✅ User Registration and Login (email or mobile number)
✅ LocalStorage persistence across browser sessions
✅ Add to Cart and Add to Wishlist functionality
✅ Sync Cart and Wishlist to MongoDB in real-time
✅ Profile Page (view user info, address management)
✅ Address Editing
✅ Checkout Page (simulate order placement)
✅ Order History
✅ Toast notifications for actions
✅ Responsive Header and Modal Login
✅ Optimized deployments (Render backend + Vercel frontend)


                                            ⚡ What We Achieved Together

Setup Backend with Express, connected MongoDB Atlas, and created RESTful APIs.
Setup Frontend with React (Vite), and implemented a full ecommerce workflow.
Deployed Frontend on Vercel, Backend on Render with health check working.
Solved multiple issues:
    .env environment variable problems.
    Vite's import.meta.env setup.
    CORS configuration between Render and Vercel.
    UptimeRobot integration to prevent backend sleeping.
    Added Speed Insights for real-user monitoring.
Setup GitHub repo correctly with proper commits.


                                                ⚙️ How to Run Locally

Clone the repo:
git clone https://github.com/ChawanSuryadev/yogalayer.git

Install dependencies (root frontend):
npm install

Install backend dependencies:
cd backend
npm install

Create .env files
    In /backend/.env ➔
        MONGO_URI=your_mongo_db_uri
        JWT_SECRET=your_jwt_secret
    In /yogalayer/.env ➔
        VITE_API_BASE_URL=http://localhost:5000

Start servers:
npm run start-dev
(Runs both frontend at localhost:3000 and backend at localhost:5000)

                                                
                                                🔥 Current Things Setup

                        Setup	                            Status
                Backend MongoDB Atlas               	✅ Connected
                   Frontend Vercel                  	✅ Deployed
                   Backend Render	                    ✅ Deployed
                UptimeRobot Monitoring	                ✅ Active
                Vercel Speed Insights	                ✅ Installed
                Login, Cart, Wishlist	                ✅ Functional

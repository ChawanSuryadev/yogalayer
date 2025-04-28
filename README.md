# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
🧘‍♂️ Yogalayer
A modern e-commerce app built with React, Node.js, Express, and MongoDB.
Supports user login, account creation, wishlist, cart, checkout, and order history.

## Available Scripts
Live Demo:
Frontend: https://yogalayer.vercel.app
Backend API: https://yogalayer-backend.onrender.com

In the project directory, you can run:
🛠️ Tech Stack
Frontend: React + Vite + Tailwind CSS

### `npm start`
Backend: Node.js + Express.js

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Database: MongoDB Atlas

The page will reload when you make changes.\
You may also see any lint errors in the console.
Deployment: Vercel (Frontend) & Render (Backend)

### `npm test`
⚡ Features
✅ User account registration & login

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
✅ Wishlist management

### `npm run build`
✅ Cart management

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
✅ Checkout & order saving

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
✅ Address update

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
✅ Secure password hashing (bcryptjs)

### `npm run eject`
✅ JWT authentication

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
✅ Persistent login (localStorage)

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
✅ Mobile responsive design

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
🚀 Deployment
Backend (Render.com)
Push your backend code to GitHub.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
Go to Render.com → New Web Service → Connect your GitHub → Select repo.

## Learn More
Set Root Directory: backend/

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
Set Build Command: npm install

To learn React, check out the [React documentation](https://reactjs.org/).
Set Start Command: node server.js

### Code Splitting
Set Environment Variables:

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
MONGO_URI: your MongoDB URI

### Analyzing the Bundle Size
JWT_SECRET: your JWT secret key

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
Deploy!

### Making a Progressive Web App
🔵 Optional:
Use UptimeRobot.com to keep Render backend awake.

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
Frontend (Vercel.com)
Push your full project to GitHub.

### Advanced Configuration
Go to Vercel.com → New Project → Import GitHub repo.

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
Set Root Directory: ./

### Deployment
Set Environment Variable:

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
VITE_API_BASE_URL: your Render backend URL (example: https://yogalayer-backend.onrender.com)

### `npm run build` fails to minify
Deploy!

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
🔥 Local Development
Clone the repo:

bash
Copy
Edit
git clone https://github.com/ChawanSuryadev/yogalayer.git
cd yogalayer
Install dependencies:

bash
Copy
Edit
npm install
cd backend
npm install
Start frontend + backend together:

bash
Copy
Edit
npm run start-dev
Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000

📂 Project Structure
bash
Copy
Edit
yogalayer/
├── backend/       # Express backend (server.js, models, routes)
├── public/        # Static files
├── src/           # React app (components, pages, utils)
├── .env           # Frontend environment
├── package.json   # Frontend package.json
👨‍💻 Author
GitHub: ChawanSuryadev

🌟 Thanks for checking out Yogalayer!
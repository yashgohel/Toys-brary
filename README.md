# Wonder-Toy Marketplace 🧸

A full-stack toy e-commerce platform built with a React (Vite) frontend and a Python Django (REST Framework) backend. 

## Features
- **User Authentication:** Sign up, Login, and secure session management using JWT tokens.
- **Product Catalog:** Browse toys, view dynamic categories, and filter by age group, price, and category.
- **Live Search:** Instant autocomplete search suggestions built right into the navigation bar.
- **Shopping Cart & Checkout:** Add items to cart, manage quantities, and checkout seamlessly.
- **Wishlist:** Save favorite toys to your personal wishlist.
- **Order History:** View past orders and delivery details.

## Tech Stack
**Frontend:** React (Vite), React Router, Lucide React (Icons), Vanilla CSS
**Backend:** Python, Django, Django REST Framework, SQLite (Development)

---

## Getting Started (Local Development)

### 1. Backend Setup
1. Open a terminal and navigate to the `backend/` directory.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
   ```
4. Run migrations and populate the database with mock toys:
   ```bash
   python manage.py migrate
   python populate.py
   ```
5. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   *The backend will run on `http://localhost:8000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or the port specified by Vite).*

---

## Deployment Guide

### Deploying the Frontend (Vercel)
This frontend is fully configured for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project from your repository.
3. Vercel will automatically detect that it is a Vite project.
4. **Environment Variables:** In the Vercel deployment settings, add a new Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-production-backend.com` *(Replace this with your deployed backend URL. If not provided, it defaults to localhost for development).*
5. Click **Deploy**.

*Note: A `vercel.json` file is already included in the root to ensure client-side routing works perfectly upon deployment.*

### Deploying the Backend
Vercel is primarily optimized for frontend hosting. Serverless environments like Vercel do not support persistent SQLite databases. 

To deploy the Django backend, it is highly recommended to use a service like **Render**, **Railway**, or **Heroku**. 
1. Provision a PostgreSQL database on your chosen host.
2. Update the `DATABASES` setting in `backend/config/settings.py` to use the Postgres connection string.
3. Deploy the backend and get your live API URL.
4. Set that URL as the `VITE_API_URL` in your Vercel frontend dashboard.

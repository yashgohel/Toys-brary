// Centralized API configuration
// During development, this defaults to the local Django server.
// In production (Vercel), it reads from the VITE_API_URL environment variable.
// Example VITE_API_URL: https://my-django-backend.onrender.com

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

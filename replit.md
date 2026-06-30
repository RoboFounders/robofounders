# RoboFounders

A landing page for RoboFounders — a "Robot COO for Global Expansion" service. Features a high-performance, scroll-controlled hero video experience with synchronized text overlays, built with a futuristic AI-robotics aesthetic (cyan/teal accents on light backgrounds).

## Architecture

- **Frontend**: React 19 + CRACO + Tailwind CSS, served on port 5000
- **Backend**: FastAPI (Python) + MongoDB, served on port 8000

## Development

- Frontend: `cd frontend && npm start` (port 5000)
- Backend: `cd backend && python3 server.py` (port 8000)

## Environment Variables

- `MONGO_URL`: MongoDB connection string (required for backend)
- `DB_NAME`: MongoDB database name (default: robofounders)
- `CORS_ORIGINS`: Comma-separated allowed origins (default: *)

## User preferences

- Use npm (not yarn) for frontend package management in this Replit environment

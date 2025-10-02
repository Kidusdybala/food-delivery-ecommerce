# FoodieExpress - Fast Food Delivery with Live Tracking

A modern full-stack food delivery application built with React, TypeScript, and Vite for the frontend, and Laravel, PHP for the backend. Features real-time order tracking, restaurant listings, payment integration, and a responsive UI.

## Features

- User authentication and authorization
- Browse restaurants and menus
- Order placement and management
- Payment processing integration
- Real-time order tracking with Mapbox integration
- Location-based services
- Deals and promotions
- Real-time notifications
- Responsive design with Tailwind CSS
- Modern UI components with shadcn/ui

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Laravel, PHP, MongoDB
- **Authentication**: Laravel Sanctum
- **Real-time**: Pusher
- **Styling**: Tailwind CSS, shadcn/ui
- **Maps**: Mapbox GL
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation

## Environment Variables

### Backend (.env)
Copy `backend/.env.example` to `backend/.env` and configure:

- `DB_CONNECTION=mongodb` (for MongoDB)
- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` for MongoDB
- `PUSHER_APP_ID`, `PUSHER_APP_KEY`, `PUSHER_APP_SECRET`, `PUSHER_HOST` for real-time features
- Payment gateway keys if applicable

### Frontend
No additional environment variables required for development.

## API Endpoints

The backend provides RESTful API endpoints:

- **Authentication**: `/api/register`, `/api/login`, `/api/logout`
- **Foods**: `/api/foods` (CRUD)
- **Restaurants**: `/api/restaurants` (CRUD)
- **Orders**: `/api/orders` (CRUD)
- **Payments**: `/api/payment/initialize`, `/api/payment/callback`, `/api/payment/verify`
- **Locations**: `/api/locations` (for delivery tracking)

Admin and delivery-specific routes are protected by role middleware.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun
- PHP (v8.2 or higher)
- Composer
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd human-hair-ecommerce
```

2. Set up the backend:
```bash
cd backend
composer install
cp .env.example .env
# Edit .env file with your database and other configurations
php artisan key:generate
php artisan migrate
php artisan db:seed
cd ..
```

3. Set up the frontend:
```bash
npm install
# or
bun install
```

4. Start the development servers:
```bash
# Backend (in one terminal)
cd backend && composer run dev

# Frontend (in another terminal)
npm run dev
# or
bun run dev
```

The frontend will be available at `http://localhost:8080` and backend at `http://localhost:8000`.

## Testing

### Backend
```bash
cd backend
composer run test
```

### Frontend
```bash
npm run lint
```

## Project Structure

```
human-hair-ecommerce/
├── backend/          # Laravel API
│   ├── app/          # Application code
│   ├── database/     # Migrations and seeders
│   ├── routes/       # API routes
│   └── ...
├── frontend/         # React frontend (if separate, but here it's src/)
├── src/              # React source code
├── public/           # Static assets
└── ...
```

## Build for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

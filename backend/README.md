# TheBrand Backend API (Prisma + MongoDB)

A complete RESTful API backend for TheBrand e-commerce platform built with Node.js, Express, Prisma, and MongoDB.

## Features

- 🔐 User Authentication (JWT-based)
- 📦 Product Management (CRUD operations)
- 🛒 Shopping Cart Functionality
- 📋 Order Management
- 👤 User Profile Management
- 🔍 Product Search and Filtering
- 🛡️ Protected Routes with Middleware
- ✅ Input Validation
- 🚨 Error Handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Next-generation ORM
- **MongoDB** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/thebrand
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

5. Generate Prisma Client:
```bash
npm run prisma:generate
```

6. Push Prisma schema to database:
```bash
npm run prisma:push
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

## Seeding the Database

To populate the database with sample products:

```bash
npm run seed
```

This will:
- Create sample products
- Add reviews to products
- Create test admin user (admin@thebrand.com / admin123)
- Create test regular user (user@thebrand.com / user123)

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema changes to database
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear entire cart (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/pay` - Update order payment status (Protected)
- `PUT /api/orders/:id/deliver` - Update order delivery status (Admin)

### User
- `GET /api/user/profile` - Get user profile (Protected)
- `PUT /api/user/profile` - Update user profile (Protected)
- `GET /api/user/orders` - Get user's orders (Protected)

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env` to: `mongodb://localhost:27017/thebrand`

### MongoDB Atlas (Cloud)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env` with your Atlas connection string

## Project Structure

```
backend/
├── lib/
│   └── prisma.js              # Prisma Client instance
├── middleware/
│   ├── auth.js               # Authentication middleware
│   └── errorHandler.js       # Error handling middleware
├── prisma/
│   └── schema.prisma         # Prisma schema definition
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── productRoutes.js      # Product routes
│   ├── cartRoutes.js         # Cart routes
│   ├── orderRoutes.js        # Order routes
│   └── userRoutes.js         # User routes
├── scripts/
│   └── seedDatabase.js       # Database seeding script
├── utils/
│   └── generateToken.js      # JWT token generation
├── .env.example              # Environment variables example
├── .gitignore
├── package.json
├── server.js                 # Main server file
└── README.md
```

## Prisma Schema

The Prisma schema defines all database models:
- User
- Product
- Review
- Cart
- CartItem
- Order
- OrderItem

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Validation

Input validation is handled using `express-validator`. Invalid inputs return:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

## License

ISC

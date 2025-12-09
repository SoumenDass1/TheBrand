# TheBrand – An Online Shopping Platform

## Hosted URL
**Frontend:** [https://thebrand-frontend.onrender.com](https://thebrand-frontend.onrender.com)
**Backend API:** [https://thebrand-u3e9.onrender.com](https://thebrand-u3e9.onrender.com)

---

## Proposal

### 1. Project Title
**TheBrand** – An Online Shopping Platform for Company Products

### 2. Problem Statement
Small and medium-sized companies often rely on third-party marketplaces to sell their products, which limits brand identity and reduces profit due to commissions.
**TheBrand** aims to provide a dedicated e-commerce platform where a company can directly display, manage, and sell its products to customers.
This system ensures a smoother shopping experience for customers and gives complete control of sales and branding to the company.

### 3. System Architecture
**Architecture:** Frontend → Backend (API) → Database

**Stack:**
*   **Frontend:** React.js with React Router for page navigation
*   **Backend:** Node.js + Express.js + Prisma ORM
*   **Database:** PostgreSQL (Hosted on Render)
*   **Authentication:** JWT-based login/signup system & Google OAuth
*   **Hosting:** Render (Frontend & Backend)

### 5. Key Features

**Authentication & Authorization:**
*   User registration, login, logout using JWT.
*   Google OAuth Integration.
*   Role-based access (User/Admin).

**CRUD Operations:**
*   Create, read, update, delete products and orders.

**frontend Routing:**
*   Pages: Home, Products, Product Details, Cart, Checkout, Login, Admin Dashboard.

**Shopping Cart:**
*   Add to cart, update quantity, remove products.

**Order Management:**
*   Place orders, view order history.
*   Admin can view all orders and update status.

**Searching, Sorting & Filtering:**
*   Real-time search by name/keyword.
*   Sort by price (low/high), name, or newest.
*   Filter by category, price range, and availability.
*   **All executed via Backend API**.

### 6. Tech Stack
*   **Frontend:** React.js, React Router, HTML, CSS, JavaScript, Vite
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL with Prisma ORM
*   **Authentication:** JWT (JSON Web Token), Google OAuth 2.0
*   **Hosting:** Render

### 7. API Overview
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/products` | GET | Get all products (supports search, filter, sort, pagination) | Public |
| `/api/products/:id` | GET | Get single product | Public |
| `/api/products` | POST | Create product | Admin only |
| `/api/products/:id` | PUT | Update product | Admin only |
| `/api/products/:id` | DELETE | Delete product | Admin only |
| `/api/orders` | POST | Place new order | Authenticated |
| `/api/orders/myorders` | GET | Get user order history | Authenticated |

---

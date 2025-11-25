# How to Check if Data is Storing in Backend

## Method 1: Using the Test Script (Recommended)

Run the check script to see all database statistics:

```bash
npm run check
```

This will show:
- ✅ Database connection status
- 📊 Count of records in each collection
- 👤 Sample users
- 📦 Sample products
- ⭐ Sample reviews
- 🛒 Sample carts
- 📋 Sample orders

## Method 2: Using API Endpoint

Start your server and visit:

```
http://localhost:5000/api/test/database
```

Or use curl:

```bash
curl http://localhost:5000/api/test/database
```

This returns JSON with:
- Connection status
- Statistics (counts)
- Sample data

## Method 3: Using Prisma Studio (Visual)

Open Prisma Studio to see all data visually:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse all tables
- View, edit, and delete records
- See relationships between data

## Method 4: Check Health Endpoint

```bash
curl http://localhost:5000/api/health
```

## Expected Output

If data is stored correctly, you should see:

```
✅ Database connection successful!

📊 Database Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Users:        2
Products:     18
Reviews:      54
Carts:        0
Cart Items:   0
Orders:       0
Order Items:  0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Troubleshooting

### If you see "Database is empty":
1. Make sure MongoDB is running
2. Check your `.env` file has correct `MONGODB_URI`
3. Run: `npm run prisma:push` to create tables
4. Run: `npm run seed` to populate data

### If connection fails:
1. Check MongoDB is running: `mongosh` or check MongoDB service
2. Verify `MONGODB_URI` in `.env` file
3. For MongoDB Atlas, check network access settings
4. Ensure Prisma Client is generated: `npm run prisma:generate`


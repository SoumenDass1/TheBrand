# Deploying to Render

I have prepared your project for easy deployment to Render using a Blueprint (Infrastructure as Code).

## Prerequisites
1. A GitHub account.
2. A [Render](https://render.com) account.

## Steps to Deploy

### 1. Push to GitHub
If you haven't already, push your project to a GitHub repository.
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

### 2. Create a New Blueprint Instance on Render
1. Log in to your Render dashboard.
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` file I created.
5. Click **Apply**.

### What will happen?
- Render will create a **PostgreSQL Database** (`thebrand-db`).
- Render will create a **Web Service** (`thebrand-backend`) for your Node.js backend.
- Render will create a **Static Site** (`thebrand-frontend`) for your React frontend.
- It will automatically link them:
    - The Backend will get the `DATABASE_URL`.
    - The Frontend will get the `VITE_API_URL` pointing to your backend.

### 3. Finalize
Once the deployment finishes (it might take a few minutes), your app will be live!
You can find the URL in the Render dashboard under the **Static Site** service.

## Troubleshooting
- **Database Connection**: If the backend fails to start, check the logs. It might be waiting for the database to be ready.
- **CORS**: If you see CORS errors in the browser console, you might need to update the backend `cors` configuration to explicitly allow your frontend URL.
    - In `backend/src/index.js`, change `app.use(cors())` to:
      ```javascript
      app.use(cors({
          origin: process.env.FRONTEND_URL || "*" // You can set FRONTEND_URL in Render env vars if needed
      }));
      ```

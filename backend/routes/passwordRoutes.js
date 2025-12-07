const express = require('express');
const router = express.Router();
const {
    forgotPassword,
    resetPassword,
    changePassword
} = require('../controllers/passwordController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

// Protected route - requires login
router.put('/change', protect, changePassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    getAllOrders
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin role
router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/orders', getAllOrders);

module.exports = router;

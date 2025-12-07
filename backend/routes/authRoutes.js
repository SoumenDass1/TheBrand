const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { googleAuth } = require('../controllers/googleAuthController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;

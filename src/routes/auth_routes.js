
import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  logoutUser 
} from '../controllers/auth_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

// View Profile Route
router.get('/profile', protect, getUserProfile);

// Update Profile Route
router.put('/profile', protect, updateUserProfile);

// Logout Route
router.post('/logout', protect, logoutUser);

export default router;
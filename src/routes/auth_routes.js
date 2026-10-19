
import express from 'express';
import { getUserProfile } from '../controllers/auth_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);

export default router;
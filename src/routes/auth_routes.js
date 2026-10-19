
import express from 'express';
import { updateUserProfile } from '../controllers/auth_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.put('/profile', protect, updateUserProfile);

export default router;
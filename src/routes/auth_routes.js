import express from 'express';
import { register, login, getProfile, updateProfile, logout } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', verifyToken, getProfile);       // Protected View Profile
router.put('/profile', verifyToken, updateProfile);    // Protected Update Profile
router.post('/logout', verifyToken, logout);           // Logout

export default router;
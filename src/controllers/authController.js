import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_here';

// 1. Register Controller
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, username, dob, phone, nic, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate actual JWT token
        const userId = 1; // Mock ID for now
        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: userId,
                name,
                username,
                email,
                dob,
                phone,
                nic,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Login Controller
export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        // Generate actual JWT token on login
        const userId = 1;
        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: userId,
                email: email
            },
            token: token,
            token_type: "Bearer"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. View Profile Controller (GET /api/profile)
export const getProfile = async (req, res) => {
    try {
        // req.user comes from the verifyToken middleware
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: {
                id: req.user ? req.user.id : 1,
                name: "Rashini Hirunika",
                username: "rashini",
                email: req.user ? req.user.email : "rashini@example.com",
                dob: "2000-01-01",
                phone: "0712345678",
                nic: "200012345678",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Profile Controller (PUT /api/profile)
export const updateProfile = async (req, res) => {
    try {
        const body = req.body || {};
        const { name, phone, dob } = body;

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user: {
                id: req.user ? req.user.id : 1,
                name: name || "Rashini Hirunika",
                username: "rashini",
                email: req.user ? req.user.email : "rashini@example.com",
                dob: dob || "2000-01-01",
                phone: phone || "0712345678",
                nic: "200012345678",
                updated_at: new Date().toISOString()
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Logout Controller (POST /api/logout)
export const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

import { body } from 'express-validator';

export const registerValidation = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('username').optional().isString(),
    body('dob').notEmpty().withMessage('Date of birth is required.'),
    body('phone').notEmpty().withMessage('Phone number is required.'),
    body('nic').notEmpty().withMessage('NIC is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password.');
        }
        return true;
    })
];

export const loginValidation = [
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.')
];
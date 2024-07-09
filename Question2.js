// authRouter.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../modules/Question2'); 


router.put('/update-password', async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

       
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        
        user.password = hashedNewPassword;
        await user.save();

        return res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

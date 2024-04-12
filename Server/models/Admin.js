const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({ 
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
});

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
    // Check if the password has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the number of salt rounds

        // Replace plain password with hashed password
        this.password = hashedPassword;

        // Move to the next middleware
        next();
    } catch (error) {
        // Pass any error to the next middleware
        next(error);
    }
});

const UsersModel = mongoose.model("users", UserSchema);

module.exports = UsersModel;

const User = require("./user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

// Create New User
exports.createNewUser = async (userInfo) => {
    const { name, email, password, role } = userInfo;

    // Don't store password in plain text form.
    // Always store password in hashed form.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    return user._id;
}


// Return token if user already exists
// Return null if user not found
exports.validateUser = async (userInfo) => {
    const { email, password } = userInfo;

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
        return;
    }

    // Comparing passed and stored password (hashed form)
    const passwordMatched = await bcrypt.compare(password, userDoc.password);

    if (!passwordMatched) {
        return;
    }

    // Generating new token
    const token = jwt.sign(
        {
            id: userDoc._id,
            email: userDoc.email,
            name: userDoc.name,
            role: userDoc.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );

    const user = {
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
    }
    return {
        token,
        user
    };
}
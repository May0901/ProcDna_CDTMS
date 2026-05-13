const User = require("./user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.createNewUser = async (userInfo) => {
    const { name, email, password, role } = userInfo;

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

    const passwordMatched = await bcrypt.compare(password, userDoc.password);

    if (!passwordMatched) {
        return;
    }

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
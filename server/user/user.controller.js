const UserService = require("./user.service");

// Create new user
exports.createNewUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const newUser = await UserService.createNewUser(userInfo)

        return res
            .status(201)
            .json(newUser);

    } catch (err) {
        return res.json({ message: err.message })
    }
}

// Authenticate user
exports.authenticateUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const userData = await UserService.validateUser(userInfo);
        if (!userData) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        return res.json({
            success: true,
            token: userData.token,
            user: userData.user,
            message: "User authenticated successfully"
        });
    } catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

// Protect route (Basic RBAC)
module.exports = (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    }

    return res.json({
        message: "Action not allowed"
    })
}
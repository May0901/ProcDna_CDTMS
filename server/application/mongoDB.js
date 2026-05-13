const mongoose = require("mongoose");
const UserService = require("../user/user.service")

const connectToMongoDB = async () => {
    try {
        mongoose.connection.on('connected', async () => {
            // Pre creating users
            try {
                const newUser = await Promise.all([
                    UserService.createNewUser({ name: 'Mayank Prasad', email: "mayankprasad@gmail.com", password: "MayankPrasad", role: "viewer" }),
                    UserService.createNewUser({ name: 'Kritika ProcDna', email: "kritikaprocdna@gmail.com", password: "KritikaProcdna", role: "admin" })
                ]);
                console.log('Users inserted');
            } catch (err) {
                console.error('Users already exists');
            }
        });

        const mongoConnection = await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(`MongoDB connection id: ${mongoConnection.connection.id}`)
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectToMongoDB



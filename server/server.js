const app = require("./application/app");
const pgsql = require("./application/pgsql");
const connectToMongoDB = require("./application/mongoDB");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await pgsql.sync({
            force: true,
            logging: false,
        });
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`Server is up and running at ${PORT}`)
        })
    } catch (err) {
        console.error(`Error in starting server: ${err.message}`)
        process.exit(1);
    }

}

startServer();
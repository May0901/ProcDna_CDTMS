require("dotenv").config();
const cors = require("cors")
const express = require("express");

const UserRoutes = require("../user/user.route");
const ClinialTrialRoutes = require("../clinicalTrial/clinicalTrial.route");
const authMiddleware = require("../middleware/auth.middleware");

// Creating express app instance
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Setting up routes
app.use("/api/auth", UserRoutes);
app.use("/api/trial", authMiddleware, ClinialTrialRoutes);

module.exports = app;
import express from "express";
import cors from "cors";
import connectDB from "./dbConnection.js";

// importing routers

// importing middleware
import verifyToken from "./middlewares/authMiddleware.js";

const app = express();

// using express.json() multiware globally to all endpoints
app.use(express.json());
// enabling cors
app.use(cors());

// connecting to database
connectDB();

// creating routes
app.get("/health", (req, res) => {
    res.send("Server is running");
});

// public routes

// using middleware for protected routes
app.use(verifyToken);

// private routes

app.listen(8000, (req, red) => {
    console.log("Server connected on port 8000");
});
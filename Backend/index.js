import express from "express";
import cors from "cors";
import connectDB from "./dbConnection.js";

// importing routers
import studentRouter from "./routes/userRoute.js";
import homeRouter from "./routes/homeRouter.js";
import courseRouter from "./routes/courseRouter.js";
import subjectRouter from "./routes/subjectRouter.js";

// importing middleware
import verifyToken from "./middlewares/authMiddleware.js";

const app = express();

// using express.json() multiware globally to all endpoints
app.use(express.json());

// enabling cors
app.use(cors());

// connecting to database
// connectDB();

// creating routes
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// public routes
app.use("/auth", studentRouter);

// using middleware for protected routes
// app.use(verifyToken);

// private routes
app.use("/home", homeRouter);

app.use("/courses", courseRouter);

app.use("/subjects", subjectRouter);

app.listen(8000, (req, red) => {
  console.log("Server connected on port 8000");
});

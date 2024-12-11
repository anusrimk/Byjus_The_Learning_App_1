import express from "express";
import { getStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

// admin endpoint
studentRouter.get("/getstudents", getStudents)

export default studentRouter;
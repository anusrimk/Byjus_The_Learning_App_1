import express from "express";
import { getSubject, createSubject } from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubject);

subjectRouter.post("/addsubject", createSubject)

export default subjectRouter;

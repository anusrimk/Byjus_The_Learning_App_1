import express from "express";
import { getSubject, createSubject } from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.get("/:subjectId", getSubject);

subjectRouter.post("/addSubject", createSubject)

export default subjectRouter;

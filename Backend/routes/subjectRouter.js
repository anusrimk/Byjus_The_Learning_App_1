import express from "express";
import { getSubject } from "../controllers/subjectContoller.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubject);

export default subjectRouter;

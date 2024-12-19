import express from "express";

import {addAssignment} from "../controllers/assignmentController.js"

const assignmentRouter = express.Router();

// route to create an assignment
assignmentRouter.post("/add", addAssignment);

export default assignmentRouter;
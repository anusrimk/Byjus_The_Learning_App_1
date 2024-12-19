import express from "express";

import {addAssignment, getAssignments} from "../controllers/assignmentController.js"

const assignmentRouter = express.Router();

// route to create an assignment
assignmentRouter.post("/add", addAssignment);

// route to get all assignments
assignmentRouter.get("/getAssignments", getAssignments)

export default assignmentRouter;
import express from "express";

import {addAssignment, getAssignmentBySubject, getAssignments} from "../controllers/assignmentController.js"

const assignmentRouter = express.Router();

// route to create an assignment
assignmentRouter.post("/add", addAssignment);

// route to get all assignments
assignmentRouter.get("/getAssignments", getAssignments)

// route to get assignments by subject
assignmentRouter.get("/getAssignments/:subject", getAssignmentBySubject)

export default assignmentRouter;
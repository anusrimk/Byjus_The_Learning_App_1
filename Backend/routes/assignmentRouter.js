import express from "express";

import {addAssignment, getAssignmentsBySubject, getAssignments, getAssigment} from "../controllers/assignmentController.js"

const assignmentRouter = express.Router();

// route to create an assignment
assignmentRouter.post("/add", addAssignment);

// route to get all assignments
assignmentRouter.get("/getAssignments", getAssignments)

// route to get assignments by subject
assignmentRouter.get("/getAssignments/:subject", getAssignmentsBySubject)

// route to get a single assignment
assignmentRouter.get("/getAssignment/:assignmentId", getAssigment)

export default assignmentRouter;
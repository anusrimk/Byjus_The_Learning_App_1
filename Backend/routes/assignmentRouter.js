import express from "express";

import {addAssignment, getAssignmentsBySubject, getAssignments, getAssigment, changeQuestionStatus} from "../controllers/assignmentController.js"

const assignmentRouter = express.Router();

// route to create an assignment
assignmentRouter.post("/add", addAssignment);

// route to get all assignments
assignmentRouter.get("/getAssignments", getAssignments)

// route to get assignments by subject
assignmentRouter.get("/getAssignments/:subject", getAssignmentsBySubject)

// route to get a single assignment
assignmentRouter.get("/getAssignment/:assignmentId", getAssigment)

// route to change a question completed status
assignmentRouter.put("/updateQuestion/:assignmentId", changeQuestionStatus)

export default assignmentRouter;
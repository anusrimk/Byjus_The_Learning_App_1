import assignmentModel from "../models/assignmentModel.js";

// function to create an assignment
export async function addAssignment(req, res) {
    try {
        const body = req.body;

        const assignment = await assignmentModel.create(body);
        if(!assignment){
            return res.status(400).send({message : "Error creating assignment"}
            )
        }

        res.status(201).send({message : "Assignment added"});
    } catch (error) {
        return res.status(500).send({message : "Internal Server Error"})
    }
}

// function to get all assignments
export async function getAssignments(req, res){
    try {
        const assignments = await assignmentModel.find()
        if(!assignments){
            return res.status(404).send({message : "Assignments not found"});
        }

        res.status(200).send({message : "Assignments retrieved", assignments})
    } catch (error) {
        return res.status(500).send({message : "Internal Server Error"})
    }
}

// function to get all assignments in a subject
export async function getAssignmentsBySubject(req, res) {
    try {
        const {subject} = req.params;

        if(subject===null || subject === undefined){
            return res.status(400).send({message : "Assignment ID is required"});
        }

        const assignments = await assignmentModel.find({subject : subject})
        if(!assignments || assignments.length === 0){
            return res.status(404).send({message : "Assignments not found"});
        }

        res.status(200).send({message : "Assignments of subject found", assignments})
    } catch (error) {
        return res.status(500).send({message : "Internal Server Error"})
    }
}

// function to get a single assignment
export async function getAssigment(req, res){
    try {
        const {assignmentId} = req.params;

        if(!assignmentId || assignmentId===undefined){
            return res.status(400).send({message : "Assignment ID invalid or not provided"})
        }

        const assignment = await assignmentModel.findById(assignmentId);
        if(!assignment){
            return res.status(404).send({message : "Assignment not found"})
        }

        res.status(200).send({message : "Assignment retrieved",assignment})
    } catch (error) {
        return res.status(500).send({message : "Internal Server Error"})
    }
}

// function to change a question's completed status
export async function changeQuestionStatus(req, res) {
    try {
      const { assignmentId } = req.params; // Extract assignment ID from the request parameters
      const { serialNum, isCompleted } = req.body; // Extract serialNum and isCompleted from the request body
  
      // Validate required data
      if (!assignmentId || serialNum === undefined || isCompleted === undefined) {
        return res.status(400).send({ message: "Invalid data provided" });
      }
  
      // Find the assignment by ID
      const assignment = await assignmentModel.findById(assignmentId);
      if (!assignment) {
        return res.status(404).send({ message: "Assignment not found" });
      }
  
      // Find the specific question by serial number
      const question = assignment.questions.find((q) => q.serialNum === serialNum);
      if (!question) {
        return res.status(404).send({ message: "Question not found" });
      }
  
      // Update the isCompleted field
      question.isCompleted = isCompleted;
  
      // Save the updated assignment
      await assignment.save();
  
      // Send a success response
      res.status(200).send({
        message: "Question status updated successfully",
        question,
      });
    } catch (error) {
      console.error("Error updating question status:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  
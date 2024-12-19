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
import assignmentModel from "../models/assignmentModel.js";

// function to create an assignment
export async function addAssignment(req, res) {
    try {
        const body = req.body;

        const assignment = assignmentModel.create(body);
        if(!assignment){
            return res.status(400).send({message : "Error creating assignment"}
            )
        }

        res.status(201).send({message : "Assignment added"});
    } catch (error) {
        return res.status(500).send({message : "Internal Server Error"})
    }
}
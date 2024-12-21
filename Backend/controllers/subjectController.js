import subjectModel from "../models/subjectModel.js";

// function to get a single subject and the content in it
export async function getSubject(req, res) {
  try {
    const { subjectId } = req.params;

    if (!subjectId) {
      return res.status(400).send({ message: "Subject ID is required" });
    }

    const subject = await subjectModel.findById(subjectId);

    if (subject) {
      return res.status(200).send(subject);
    }

    return res.status(404).send({ message: "Subject not found" });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred", error: error.message });
  }
}

// function to create a subject
export async function createSubject(req, res) {
  try {
    const subject = req.body;
    if (subject === undefined || subject === null) {
      return res.status(404).send({ message: "Subject is required" });
    }

    const sub = await subjectModel.create(subject);
    if(!sub){
      return res.status(400).send({ message: "Subject not created" });
    }
    return res.status(201).send({sub, message : "Subject added succesfully"});
  } catch (error) {
    res.status(500).send({ message: "Error :", error });
  }
}
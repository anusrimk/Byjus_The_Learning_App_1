import subjectModel from "../models/subjectModel.js";

// function to get a single subject and the content in it
export async function getSubject(req, res) {
  try {
    const id = req.params.id;
    if (id === undefined || id === null) {
      res.status(404).send({ message: "ID is required" });
    }
    const subject = await subjectModel.findById({ _id: id });

    if (subject) {
      return res.status(200).send(subject);
    }
    res.status(404).send({ message: "Subjects not found" });
  } catch (error) {
    res.status(500).send({ message: "Error :", error });
  }
}

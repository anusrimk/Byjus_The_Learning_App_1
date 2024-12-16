import courseModel from "../models/courseModel.js";

// fetches all courses available
export async function getAllCourses(req, res) {
  try {
    const course = await courseModel.find();
    if (course) {
      return res.status(200).send(course);
    }
    res.status(404).send({ message: "Courses not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// fetches a single course by id
export async function getCourseById(req, res) {
  try {
    const course = await courseModel.findById(req.params.id);
    if (course) {
      return res.status(200).send(course);
    }
    res.status(404).send({ message: "Course not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// creates a new course
export async function createCourse(req, res) {
  try {
    const course = await courseModel.create(req.body);
    if (!course) {
      return res.status(400).send("Course cannot be created");
    }
    res.status(201).send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// updates a course by id
export async function updateCourse(req, res) {
  try {
    const course = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(400).send("Course cannot be updated");
    }
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

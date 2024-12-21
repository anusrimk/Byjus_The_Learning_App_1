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

// fetches a single course by name
export async function getCourseByName(req, res) {
  try {
    const { name } = req.params; // Extract the name from req.params

    if (!name) {
      return res.status(400).send({ message: "Course name is required" }); // Validate name
    }

    const course = await courseModel.findOne({ name }); // Properly use name in the query

    if (course) {
      return res.status(200).send(course); // Return the course if found
    }

    return res.status(404).send({ message: "Course not found" }); // Handle course not found
  } catch (error) {
    return res.status(500).send({ message: "Error occurred", error }); // Handle server errors
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

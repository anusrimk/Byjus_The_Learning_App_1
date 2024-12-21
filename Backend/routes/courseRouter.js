import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  getCourseByName,
} from "../controllers/courseController.js";

const courseRouter = new express.Router();

// fetches all courses available
courseRouter.get("/getCourses", getAllCourses);

// fetches a single course by id
courseRouter.get("/getCourseById/:id", getCourseById);

// fetches a single course by name
courseRouter.get("/getCourseByName/:name", getCourseByName);

// adds a new course
courseRouter.post("/addCourse", createCourse);

// updates a course by id
courseRouter.put("/updateCourse/:id", updateCourse);

export default courseRouter;

import express from "express";
import { getDetails } from "../controllers/homeController.js";

const homeRouter = express.Router();

homeRouter.get("/", getDetails);

export default homeRouter;

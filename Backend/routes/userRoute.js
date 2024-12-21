import express from "express";
import { getUsers, registerUser, updateUserDetails, deleteUser, updatePassword, getUser } from "../controllers/userController.js";

const userRouter = express.Router();

// admin endpoint
userRouter.get("/getusers", getUsers)

userRouter.get("/getuser/:username", getUser)

userRouter.post("/register", registerUser)

userRouter.put("/updateuser/:id", updateUserDetails)

userRouter.put("/updatePassword", updatePassword)

userRouter.delete("/deleteuser/:id", deleteUser)

export default userRouter;
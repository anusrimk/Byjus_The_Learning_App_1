import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";

// admin
export async function getUsers(req, res){
    try {
        const users = await userModel.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({message : "Error : ", error})
    }
}

//creating a user 
export async function registerUser(req, res) {
    try {
        const user = req.body;

        const existingUser = await userModel.findOne({username : user.username})
        if(existingUser){
          return res.status(400).send({message : "User already exists"})
        }

        // generating salt and encrypting the password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt)

        await userModel.create(user);
        res.status(201).send({ message: "User Created" });
  
      } catch (error) {
        console.error("Error creating User:", error);
        res.status(500).send({ message: "Error Creating User" });
      }
}

//updating user details
export async function updateUserDetails(req, res) {
  try {
      const id = req.params.id; // Extract user ID from route params
      const updatedUser = req.body; // Extract updated data from the request body

      // Check if user exists
      const user = await userModel.findById(id);
      if (!user) {
          return res.status(404).send({ message: "User Not Found" });
      }

      // Perform the update
      const result = await user.updateOne({ $set: updatedUser });
      res.status(200).send({ message: "User Updated Successfully", result });

  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send({ message: "Error Updating User", error });
  }
}

// updating password
// frontend
// getuserdetails, compare state with input, if they are same, if it's not, error
// input === password ? call : error

export async function updatePassword(req, res){
  try {
    const body = req.body;
    const user = await userModel.findOne({username : body.username});

    if(!user){
      return res.status(404).send({message : "User not found"})
    }

    // generating salt and encrypting the password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt)

    // updating password
    user.password = body.password;
    await user.save();
    res.status(200).send({message : "Password updated succesfully"})
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).send({ message: "Error Deleting User", error });
  }
}


//deleting a user
export async function deleteUser(req, res) {
  try {
      const id = req.params.id; 

      const user = await userModel.findById(id);
      if (!user) {
          return res.status(404).send({ message: "User Not Found" });
      }

      await user.deleteOne();
      res.status(200).send({ message: "User Deleted Successfully" });

  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({ message: "Error Deleting User", error });
  }
}

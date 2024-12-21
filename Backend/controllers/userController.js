import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";

// admin
export async function getUsers(req, res){
  
  try {
    const users = await userModel.find();
    console.log("Fetching users...");
        if(!users){
          console.log("No users");
          return res.status(400).send({message : "No users"})
        }
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({message : "Error : ", error})
    }
}

// getting a single user by user
export async function getUser(req, res) {
  try {
    const { username } = req.params; 

    if (!username) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await userModel.findOne({username}); 

    if (!user) {
      return res.status(404).send({ message: "User not found" }); 
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Error occurred", error });
  }
}

//creating a user 
export async function registerUser(req, res) {
  try {
    const user = req.body;
    console.log("Received User Data:", user);

    if (!user.username || !user.password || !user.name || !user.email) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ username: user.username });
    if (existingUser) {
      return res.status(400).send({ message: "User with that username already exists" });
    }

    // generating salt and encrypting the password
    const salt = bcrypt.genSaltSync(10);
    user.password = user.password ? bcrypt.hashSync(user.password, salt) : null;

    if (!user.password) {
      return res.status(400).send({ message: "Password is required" });
    }

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


// function to login user
export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const { password: _, ...userData } = user.toObject();
    res.status(200).send(userData);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login failed. Please try again." });
  }
}
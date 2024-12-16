import userModel from "../models/userModel.js";

// fetching user details based on their ID
export async function getDetails(req, res) {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found", user });
  } catch (error) {
    res.status(500).send({ message: "Error getting details", error });
  }
}

// getting notifications

// marking notifications as read

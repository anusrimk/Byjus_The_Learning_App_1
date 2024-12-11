import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username is already taken"],
            min: [4, "Username too short"],
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "male", "female"],
        },  
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
        },
        courses:{
            type: String,
            enum: ["12th", "11th", "10th"]
        },
        role:{
            type: String,
            enum: ["Student", "Parent", "Teacher"]
        }
        },
        { timestamps: true }
)

// creating the user model
const studentModel = mongoose.model("students", studentSchema);
export default studentModel;
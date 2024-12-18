import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
            ref : "courses",
            enum: ["12th NEET", "12th JEE", "12th HSC"],
            default : "12th NEET"
        },
        role:{
            type: String,
            enum: ["Student", "Parent", "Teacher"]
        }
        },
        { timestamps: true }
)

// creating the user model

// model(collection_name, schema_name)
const userModel = mongoose.model("users", userSchema);
export default userModel;
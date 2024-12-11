import mongoose from "mongoose";

function connectDB() {
  const url = "mongodb://localhost:27017/ByjusTheLearningApp";
  
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database is up and connected");
    })
    .catch((error) => {
      console.log("Error in connecting to DB :", error);
    });
}

export default connectDB;
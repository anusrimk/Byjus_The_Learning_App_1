import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numOfLecs: {
    type: Number,
    required: true,
  }
});

const subjectModel = mongoose.model("subjects", subjectSchema);

export default subjectModel;

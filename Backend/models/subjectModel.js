import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numOfLecs: {
    type: Number,
    required: true,
  },
  completedLecs: {
    type: Number,
    default: 0,
  },
});

const subjectModel = mongoose.model("subjects", subjectSchema);

export default subjectModel;

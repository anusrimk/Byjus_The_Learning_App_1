import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
  ],
});

const courseModel = mongoose.model("courses", courseSchema);

export default courseModel;

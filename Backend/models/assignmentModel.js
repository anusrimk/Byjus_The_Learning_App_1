import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    numOfQues: {
        type: Number,
        required: true,
        default: 0,
    },
    completedQues: {
        type: Number,
        default: 0,
    },
    questions: [
        {
            serialNum: {
                type: Number,
                required: true,
            },
            questionText: {
                type: String,
                required: true,
            },
            options: [
                {
                    type: String,
                    required: true,
                },
            ],
            difficulty : {
                type : String,
                enum : ["Easy", "Medium", "Hard"]
            },
            correctAnswer: {
                type: String,
                required: true,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            }
        },
    ],
});

const assignmentModel = mongoose.model("assignments", assignmentSchema);

export default assignmentModel;

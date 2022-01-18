const mongoose = require("mongoose");

//creating question schema
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//compiling schema with name "Question"
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

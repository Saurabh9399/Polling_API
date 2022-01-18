const mongoose = require("mongoose");
const Question = require("../../../model/question");
const Option = require("../../../model/option");

//addQuestion Controller
module.exports.addQuestion = async function (req, res) {
  try {
    let question = await Question.create(req.body);
    if (question) {
      return res.json({
        question,
        data: { message: "Question Created Sucessfully!" },
      });
    }
  } catch (err) {
    console.log("error in addQuestion controller->", err);
    return res.status(500).json({
      data: {
        message: "Internal Server Error",
      },
    });
  }
};

//view question controller
module.exports.viewQuestion = async function (req, res) {
  try {
    let question = await Question.findById(req.params.id).populate("options");

    return res.json({ question: question });
  } catch (err) {
    console.log("error in viewQuestion controller->", err);
    return res.status(500).json({
      data: {
        message: "Internal Server Error",
      },
    });
  }
};

//delete question controller
module.exports.delQuestion = async function (req, res) {
  try {
    let id = req.params.id;

    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    //upvotes on options (if any)
    let options = question.options;
    for (let i = 0; i < options.length; i++) {
      console.log(options[i].votes);
      if (options[i].votes > 0) {
        return res.status(404).json({
          data: {
            message: "Question has upvotes to option, NOT_DELETION_POSSIBLE",
          },
        });
      }
    }

    //if no upvotes to options
    await Option.deleteMany({ question: id });
    await Question.findByIdAndDelete(id);

    return res.status(200).json({
      data: {
        message: "QUESTION_DELETED",
      },
    });
  } catch (err) {
    console.log("Error in delete question controller->", err);
    return res.status(500).json({
      data: {
        message: "Internal Server Error",
      },
    });
  }
};

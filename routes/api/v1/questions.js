const express = require("express");
const router = express.Router();

const questionController = require("../../../controllers/api/v1/questionsController");

router.post("/create", questionController.addQuestion);
router.get("/:id", questionController.viewQuestion);
router.delete("/:id/delete", questionController.delQuestion);

module.exports = router;

const express = require('express');
const router = express.Router();

//console.log("inside options router")
const optionsController = require('../../../controllers/api/v1/optionsController');

router.delete('/:id/delete', optionsController.deleteOption);
router.get('/:id/addvote', optionsController.addVote);
router.post('/:id/options/create', optionsController.addOption);

module.exports = router;
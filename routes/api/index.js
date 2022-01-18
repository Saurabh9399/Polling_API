const express = require('express');
const router = express.Router();

//redirect all v1 URLs to v1's index.js
router.use('/v1', require('./v1/index'));

//export router
module.exports = router;
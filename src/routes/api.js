const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

router.get('/export', exportController.downloadCandidatesCsv);

module.exports = router;
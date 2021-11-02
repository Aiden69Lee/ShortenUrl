const express = require('express');
const { manageUrl } = require('../controllers/UrlController');

const router = express.Router();
router.post('/manage-url', manageUrl);

module.exports = router;
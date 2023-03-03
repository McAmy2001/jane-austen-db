const express = require('express');
const router = express.Router();

router.use(require('./novelRoutes'));
router.use(require('./characterRoutes'));

module.exports = router;
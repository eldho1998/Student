const express = require('express');
const router = express.Router();

const studentRoutes = require('../routes/Student-routes');

router.use('/student', studentRoutes);

module.exports = router;

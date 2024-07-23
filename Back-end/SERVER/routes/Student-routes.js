const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Student-Controllers');

router.get('/', controllers.getStudents);
router.get('/:id', controllers.getStudentById);
router.post('/', controllers.postStudent);
router.patch('/:id', controllers.patchStudentById);
router.delete('/:id', controllers.deleteStudentById);

module.exports = router;

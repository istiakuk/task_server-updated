const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authenticateToken = require('../middleware/authMiddleware');

// Route accessible by both admin and users
router.get('/', authenticateToken, attendanceController.getAllAttendance);
router.get('/:id', authenticateToken, attendanceController.getAttendanceById);

// Routes accessible by users
router.post('/', authenticateToken, attendanceController.createAttendance);
router.post('/punch-in', authenticateToken, attendanceController.punchIn);
router.post('/punch-out', authenticateToken, attendanceController.punchOut);

// Routes accessible only by admins
router.put('/:id', authenticateToken, attendanceController.updateAttendance);
router.delete('/:id', authenticateToken, attendanceController.deleteAttendance);

module.exports = router;

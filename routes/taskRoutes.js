const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/:id', authenticateToken, taskController.getTaskById);

// Routes accessible only by admins
router.post('/', authenticateToken, taskController.createTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

// Route to get all tasks (accessible only by admins)
router.get('/', authenticateToken, taskController.getAllTasks);

module.exports = router;

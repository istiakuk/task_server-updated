const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/:id', authenticateToken, projectController.getProjectById);

// Routes accessible only by admins
router.post('/', authenticateToken, projectController.createProject);
router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);

// Route to get all projects (accessible only by admins)
router.get('/', authenticateToken, projectController.getAllProjects);

module.exports = router;

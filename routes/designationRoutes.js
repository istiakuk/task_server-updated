const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes accessible by both admin and users
router.get('/:id', authenticateToken, designationController.getDesignationById);

// Routes accessible only by admins
router.post('/', authenticateToken, designationController.createDesignation);
router.put('/:id', authenticateToken, designationController.updateDesignation);
router.delete('/:id', authenticateToken, designationController.deleteDesignation);

// Route to get all designations (accessible only by admins)
router.get('/', authenticateToken, designationController.getAllDesignations);

module.exports = router;

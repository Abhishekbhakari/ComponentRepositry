const express = require('express');
const router = express.Router();
const { addComponent, updateComponent, searchComponents } = require('../controllers/componentController');
const { adminAuth } = require('../middleware/authMiddleware');

router.post('/', adminAuth, addComponent);
router.put('/:id', adminAuth, updateComponent);
router.get('/search', searchComponents);

module.exports = router;

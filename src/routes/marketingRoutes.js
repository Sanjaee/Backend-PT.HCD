const express = require('express');
const { createMarketing, getMarketings, updateMarketing, deleteMarketing, getMarketingById } = require('../controllers/marketingController');
const router = express.Router();

router.post('/', createMarketing);
router.get('/', getMarketings);
router.put('/:id', updateMarketing);
router.delete('/:id', deleteMarketing);
router.get('/:id', getMarketingById);


module.exports = router;

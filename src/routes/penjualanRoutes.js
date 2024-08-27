const express = require('express');
const { createPenjualan, getPenjualans } = require('../controllers/penjualanController');
const router = express.Router();

router.post('/', createPenjualan);
router.get('/', getPenjualans);

module.exports = router;

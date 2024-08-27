const express = require('express');
const { createPenjualan, getPenjualan } = require('../controllers/penjualanController');
const router = express.Router();

router.post('/', createPenjualan);
router.get('/', getPenjualan);

module.exports = router;

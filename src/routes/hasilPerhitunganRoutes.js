
const express = require('express');
const router = express.Router();
const { getHasilPerhitungan, getHasilPerhitunganById, deleteHasilPerhitungan } = require('../controllers/hasilPerhitunganController');


router.get('/', getHasilPerhitungan);
router.get('/:id', getHasilPerhitunganById);
router.delete('/:id', deleteHasilPerhitungan);

module.exports = router;

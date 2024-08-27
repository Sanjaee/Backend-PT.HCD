const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ambil Semua Hasil Perhitungan
exports.getHasilPerhitungan = async (req, res) => {
  try {
    const hasilPerhitungan = await prisma.hasilPerhitungan.findMany();
    res.json(hasilPerhitungan);
  } catch (error) {
    console.error('Error retrieving hasilPerhitungan:', error);
    res.status(500).json({ error: "Error retrieving hasilPerhitungan" });
  }
};

// Ambil Hasil Perhitungan Berdasarkan id
exports.getHasilPerhitunganById = async (req, res) => {
  const { id } = req.params;

  try {
    const hasilPerhitungan = await prisma.hasilPerhitungan.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!hasilPerhitungan) {
      return res.status(404).json({ error: "Hasil Perhitungan not found" });
    }

    res.json(hasilPerhitungan);
  } catch (error) {
    console.error('Error retrieving hasilPerhitungan by ID:', error);
    res.status(500).json({ error: "Error retrieving hasilPerhitungan by ID" });
  }
};

// Hapus Hasil Perhitungan Berdasarkan id
exports.deleteHasilPerhitungan = async (req, res) => {
  const { id } = req.params;

  try {
    const hasilPerhitungan = await prisma.hasilPerhitungan.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: 'Data berhasil dihapus', hasilPerhitungan });
  } catch (error) {
    console.error('Error deleting hasilPerhitungan:', error);
    res.status(500).json({ error: "Error deleting hasilPerhitungan" });
  }
};

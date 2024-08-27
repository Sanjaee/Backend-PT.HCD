const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tambah Marketing
exports.createMarketing = async (req, res) => {
  const { name } = req.body;

  try {
    const newMarketing = await prisma.marketing.create({
      data: { name },
    });
    res.json(newMarketing);
  } catch (error) {
    res.status(500).json({ error: "Error creating marketing" });
  }
};

// Get Marketing by id
exports.getMarketingById = async (req, res) => {
  const { id } = req.params;

  try {
    const marketing = await prisma.marketing.findUnique({
      where: { id: Number(id) },
    });
    if (marketing) {
      res.json(marketing);
    } else {
      res.status(404).json({ error: "Marketing not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving marketing" });
  }
};


// Ambil Semua Marketing
exports.getMarketing = async (req, res) => {
  try {
    const marketing = await prisma.marketing.findMany();
    res.json(marketing);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving marketing" });
  }
};

exports.updateMarketing = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedMarketing = await prisma.marketing.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updatedMarketing);
  } catch (error) {
    res.status(500).json({ error: "Error updating marketing" });
  }
};

// Delete Marketing
exports.deleteMarketing = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.marketing.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Marketing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting marketing" });
  }
};

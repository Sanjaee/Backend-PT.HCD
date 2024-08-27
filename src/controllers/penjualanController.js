const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateTransactionNumber = require('./generateTransactionNumber');

exports.createPenjualan = async (req, res) => {
  const { marketingId, cargo_fee, total_balance } = req.body;

  try {
    const marketingIdInt = parseInt(marketingId, 10);
    const cargoFeeInt = parseInt(cargo_fee, 10);
    const totalBalanceInt = parseInt(total_balance, 10);

    // Hitung grand total dengan menjumlahkan cargo fee dan total balance
    const grandTotalInt = cargoFeeInt + totalBalanceInt;

    const transactionNumber = await generateTransactionNumber();
    const currentDate = new Date(); // Menggunakan tanggal saat ini

    const newPenjualan = await prisma.penjualan.create({
      data: {
        transaction_number: transactionNumber,
        marketingId: marketingIdInt,
        date: currentDate,
        cargo_fee: cargoFeeInt,
        total_balance: totalBalanceInt,
        grand_total: grandTotalInt,
      },
    });

    await hitungKomisi(marketingIdInt, currentDate, grandTotalInt);

    res.json(newPenjualan);
  } catch (error) {
    console.error('Error creating penjualan:', error);
    res.status(500).json({ error: "Error creating penjualan" });
  }
};

exports.getPenjualans = async (req, res) => {
  try {
    const penjualans = await prisma.penjualan.findMany({
      include: { marketing: true },
    });
    res.json(penjualans);
  } catch (error) {
    console.error('Error retrieving penjualans:', error);
    res.status(500).json({ error: "Error retrieving penjualans" });
  }
};

async function hitungKomisi(marketingId, date, omzet) {
  const marketing = await prisma.marketing.findUnique({
    where: { id: marketingId },
  });

  // Mendapatkan nama bulan dari tanggal
  const bulanNama = getBulanNama(date);

  let komisiPersen = 0;

  if (omzet >= 500000000) {
    komisiPersen = 10;
  } else if (omzet >= 200000000) {
    komisiPersen = 5;
  } else if (omzet >= 100000000) {
    komisiPersen = 2.5;
  } else {
    komisiPersen = 0;
  }

  const komisiNominal = (komisiPersen / 100) * omzet;

  await prisma.hasilPerhitungan.create({
    data: {
      marketing: marketing.name,
      bulan: bulanNama,
      omzet,
      komisi_persen: komisiPersen,
      komisi_nominal: komisiNominal,
    },
  });
}

//untuk mendapatkan nama bulan dari tanggal
function getBulanNama(date) {
  const bulanArray = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const bulanIndex = date.getMonth(); 
  return bulanArray[bulanIndex];
}

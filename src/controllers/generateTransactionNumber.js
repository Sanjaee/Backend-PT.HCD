const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk menghasilkan nomor transaksi berikutnya
async function generateTransactionNumber() {
  try {
    const lastTransaction = await prisma.penjualan.findFirst({
      orderBy: { transaction_number: 'desc' },
      select: { transaction_number: true },
    });

    let nextNumber = '001';
    if (lastTransaction) {
      const lastNumber = parseInt(lastTransaction.transaction_number.slice(3), 10);
      const newNumber = lastNumber + 1;
      nextNumber = newNumber.toString().padStart(3, '0');
    }

    return `TRX${nextNumber}`;
  } catch (error) {
    console.error('Error generating transaction number:', error);
    throw new Error('Failed to generate transaction number');
  }
}

module.exports = generateTransactionNumber;

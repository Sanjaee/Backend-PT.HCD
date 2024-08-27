-- CreateTable
CREATE TABLE "Marketing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Marketing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penjualan" (
    "id" SERIAL NOT NULL,
    "transaction_number" TEXT NOT NULL,
    "marketingId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cargo_fee" INTEGER NOT NULL,
    "total_balance" INTEGER NOT NULL,
    "grand_total" INTEGER NOT NULL,

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilPerhitungan" (
    "id" SERIAL NOT NULL,
    "marketing" TEXT NOT NULL,
    "bulan" TEXT NOT NULL,
    "omzet" INTEGER NOT NULL,
    "komisi_persen" DOUBLE PRECISION NOT NULL,
    "komisi_nominal" INTEGER NOT NULL,

    CONSTRAINT "HasilPerhitungan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_marketingId_fkey" FOREIGN KEY ("marketingId") REFERENCES "Marketing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

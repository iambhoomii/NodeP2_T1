-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "receiptIssued" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reconciliationStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "refundedAmount" INTEGER;

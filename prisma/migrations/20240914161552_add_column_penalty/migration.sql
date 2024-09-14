/*
  Warnings:

  - You are about to drop the `Borrow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_bookCode_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_memberCode_fkey";

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "penaltyEndDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "Borrow";

-- CreateTable
CREATE TABLE "borrows" (
    "id" SERIAL NOT NULL,
    "bookCode" VARCHAR(8) NOT NULL,
    "memberCode" CHAR(4) NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnedDate" TIMESTAMP(3),

    CONSTRAINT "borrows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "books"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "members"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

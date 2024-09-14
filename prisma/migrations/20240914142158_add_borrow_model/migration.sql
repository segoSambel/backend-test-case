-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "bookCode" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "books"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "members"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

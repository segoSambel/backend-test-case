-- CreateTable
CREATE TABLE "books" (
    "code" VARCHAR(8) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("code")
);

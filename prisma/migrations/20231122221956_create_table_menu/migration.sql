-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sub_MenuId" INTEGER,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

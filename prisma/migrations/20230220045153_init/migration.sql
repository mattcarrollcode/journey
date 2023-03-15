-- CreateTable
CREATE TABLE "Trip" (
    "id" STRING NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "origin" STRING NOT NULL,
    "destination" STRING NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

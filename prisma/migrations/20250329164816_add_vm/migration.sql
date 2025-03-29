-- CreateTable
CREATE TABLE "VM" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'stopped',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "password" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "VM_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VM" ADD CONSTRAINT "VM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tasks";

-- CreateTable
CREATE TABLE "Listes" (
    "id_liste" SERIAL NOT NULL,
    "nom_liste" VARCHAR(255) NOT NULL,

    CONSTRAINT "Listes_pkey" PRIMARY KEY ("id_liste")
);

-- CreateTable
CREATE TABLE "Taches" (
    "id_tache" SERIAL NOT NULL,
    "id_liste" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "etat" BOOLEAN NOT NULL,

    CONSTRAINT "Taches_pkey" PRIMARY KEY ("id_tache")
);

-- CreateIndex
CREATE INDEX "fk_listes" ON "Taches"("id_liste");

-- AddForeignKey
ALTER TABLE "Taches" ADD CONSTRAINT "Taches_id_liste_fkey" FOREIGN KEY ("id_liste") REFERENCES "Listes"("id_liste") ON DELETE RESTRICT ON UPDATE CASCADE;

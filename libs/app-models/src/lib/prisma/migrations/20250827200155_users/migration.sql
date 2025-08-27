-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('active', 'disabled');

-- CreateEnum
CREATE TYPE "public"."AppRole" AS ENUM ('admin', 'support', 'user');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" CHAR(255) NOT NULL,
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'active',
    "role" "public"."AppRole" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

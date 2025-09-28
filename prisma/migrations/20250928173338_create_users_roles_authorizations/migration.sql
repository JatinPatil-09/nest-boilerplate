-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."authorizations" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "resource_name" TEXT,
    "attribute_name" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "locale_en" TEXT,

    CONSTRAINT "authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_authorizations" (
    "id" BIGSERIAL NOT NULL,
    "role_id" BIGINT NOT NULL,
    "authorization_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "role_authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_email" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "index_roles_on_name" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "index_authorizations_on_name" ON "public"."authorizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "index_role_authorizations_on_role_id_and_authorization_id" ON "public"."role_authorizations"("role_id", "authorization_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_authorizations" ADD CONSTRAINT "role_authorizations_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_authorizations" ADD CONSTRAINT "role_authorizations_authorization_id_fkey" FOREIGN KEY ("authorization_id") REFERENCES "public"."authorizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

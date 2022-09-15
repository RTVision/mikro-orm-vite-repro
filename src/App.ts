import "reflect-metadata";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql"; // or any other driver package
import {
  AnyEntity,
  EntityClass,
  ReflectMetadataProvider,
} from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/core";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { fastify } from "fastify";

const entityMap = import.meta.glob<EntityClass<AnyEntity>>("./models/**/*.ts", {
  eager: true,
  import: "default",
});

const orm = MikroORM.init<PostgreSqlDriver>({
  entities: Object.values(entityMap),
  discovery: { disableDynamicFileAccess: true },
  metadataProvider: ReflectMetadataProvider,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: "postgresql",
});

const app = fastify({
  logger: import.meta.env.DEV,
}).withTypeProvider<JsonSchemaToTsProvider>();

app.get("/", () => {
  return "hello world";
});

if (import.meta.env.PROD) {
  await app.listen({ port: 8000, host: "::" });
}

export default app;

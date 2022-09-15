import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { fastify } from "fastify";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql"; // or any other driver package
import { AnyEntity, Connection, EntityClass, Options } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const entityMap = import.meta.glob<EntityClass<AnyEntity>>("./models/**/*.ts", {
  eager: true,
  import: "default",
});

console.log(entityMap);

const orm = MikroORM.init<PostgreSqlDriver>({
  entities: Object.values(entityMap),
  entitiesTs: ["./src/models/*/*.ts"],
  metadataProvider: TsMorphMetadataProvider,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
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

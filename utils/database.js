import PrismaEdge from "@prisma/client/edge";

const { PrismaClient } = PrismaEdge;

let database;

if (process.env.NODE_ENV === "production") {
  database = new PrismaClient();
} else {
  if (!global.database) {
    global.database = new PrismaClient();
  }
  database = global.database;
}

export { database };

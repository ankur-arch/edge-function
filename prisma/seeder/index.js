const { PrismaClient } = require("@prisma/client");
const seed = require("./seed.json");

const database = new PrismaClient();

const main = async () => {
  console.time("Seeding Database");

  // clear database first
  await database.quote.deleteMany({});

  // seed altogether
  await database.quote.createMany({
    data: seed,
  });
  console.timeEnd("Seeding Database");
  return "Done Seeding";
};

main().then(() => {
  console.log("Done seeding");
});

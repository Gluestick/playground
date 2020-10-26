const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const typeDefs = require("./schema");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const resolvers = require("./resolvers");

(async () => {
  // The "sqlite" package is used for interacting with an in-memory database.
  // See the following link, or the code below for some example usages:
  //   https://www.npmjs.com/package/sqlite#examples
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database
  });

  // Migrate and reseed the entire database on restart
  await db.migrate({
    force: true,
    migrationsPath: "./src/migrations"
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    // Defaults to false, allows for deduplicating some resolvers that are the
    // same for all concrete types of the same interface.
    inheritResolversFromInterfaces: true
  });
  const server = new ApolloServer({
    schema,
    // Provides a context object with the database as the 2nd argument to all
    // resolver functions.
    context: () => ({ db })
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();

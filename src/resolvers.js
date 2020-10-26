const { isoGenderToString } = require("./gender");
const queryResolvers = require("./resolvers/queries");
const mutationResolvers = require("./resolvers/mutations");

module.exports = {
  // To add root field resolvers, see ./resolvers/queries.js
  Query: queryResolvers,

  // To add mutation resolvers, see ./resolvers/mutations.js
  Mutation: mutationResolvers,

  // Below here are field resolvers for all custom types
  Organisation: {
    employees: ({ id: organisationId }, _args, { db }) =>
      db.all("SELECT * FROM employees WHERE organisationId = ?", organisationId)
  },
  Employee: {
    // The __resolveType field resolver is called with an Employee as the first
    // argument, and determines the employee's concrete type. This is needed for
    // e.g. "... on Consultant { }" queries.
    __resolveType: ({ managerId }) => (managerId === null ? "Manager" : "Consultant"),
    personalia: ({ firstName, lastName, gender }) => ({ firstName, lastName, gender: isoGenderToString(gender) }),
    organisation: ({ organisationId }, _args, { db }) =>
      db.get("SELECT * FROM organisations WHERE id = ?", organisationId)
  },
  Consultant: {
    manager: ({ managerId }, _args, { db }) => db.get("SELECT * FROM employees WHERE id = ?", managerId)
  },
  Manager: {
    subordinates: ({ id: managerId }, _args, { db }) => db.all("SELECT * FROM employees WHERE managerId = ?", managerId)
  },
  Personalia: {
    fullName: ({ firstName, lastName }) => [firstName, lastName].join(" ")
  }
};

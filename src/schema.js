const { gql } = require("apollo-server");

module.exports = gql`
  type Organisation {
    name: String!
    employees: [Employee!]!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Personalia {
    firstName: String!
    lastName: String!
    fullName: String!
    gender: Gender!
  }

  interface Employee {
    id: ID!
    personalia: Personalia!
    organisation: Organisation!
  }

  type Manager implements Employee {
    id: ID!
    personalia: Personalia!
    organisation: Organisation!
    subordinates: [Consultant!]!
  }

  type Consultant implements Employee {
    id: ID!
    personalia: Personalia!
    organisation: Organisation!
    manager: Manager!
  }

  type Query {
    organisations: [Organisation!]!
    employees(gender: Gender): [Employee!]!
  }

  input CreateEmployeeInput {
    organisationId: ID!
    managerId: ID
    firstName: String!
    lastName: String!
    gender: Gender!
  }

  input UpdateEmployeeInput {
    id: ID!
    firstName: String
    lastName: String
    gender: Gender
  }

  input DeleteEmployeeInput {
    id: ID!
  }

  # Add your (input) types here!

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(input: UpdateEmployeeInput!): Employee!
    deleteEmployee(input: DeleteEmployeeInput!): Boolean!

    # Add your own mutations here!
  }
`;

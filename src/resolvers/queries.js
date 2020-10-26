const { stringToIsoGender } = require("../gender");

module.exports.organisations = (_parent, _args, { db }) => db.all("SELECT * FROM organisations");

module.exports.employees = (_parent, { gender }, { db }) => {
  const genders = gender ? [stringToIsoGender(gender)] : [1, 2];
  return db.all(`SELECT * FROM employees WHERE gender IN (${genders.join(", ")})`);
};

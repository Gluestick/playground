const { stringToIsoGender } = require("../gender");

module.exports.createEmployee = async (_parent, { input }, { db }) => {
  const { firstName, lastName, managerId, organisationId, gender: genderString } = input;
  const gender = stringToIsoGender(genderString);
  const {
    lastID
  } = await db.run(
    "INSERT INTO employees (firstName, lastName, gender, managerId, organisationId) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, gender, managerId, organisationId]
  );

  return await db.get("SELECT * FROM employees WHERE id = ?", lastID);
};

module.exports.updateEmployee = async (_parent, { input: { id, ...attrs } }, { db }) => {
  // Note to future self: use an ORM
  // Not to reader:       don't ever update entities like this
  const updates = Object.entries(attrs).map(([key, rawValue]) => {
    const value = key === "gender" ? stringToIsoGender(rawValue) : rawValue;
    db.run(`UPDATE employees SET ${key} = ? WHERE id = ?`, [value, id]);
  });
  await Promise.all(updates);
  return await db.get("SELECT * FROM employees WHERE id = ?", id);
};

module.exports.deleteEmployee = async (_parent, { input: { id } }, { db }) => {
  const result = await db.run("DELETE FROM employees WHERE id = ?", id);

  // Clean up stale manager references.
  await db.run("UPDATE employees SET managerId = NULL WHERE managerId = ?", id);
  return result.changes > 0;
};

// Add your own mutations like this:
//
//   module.exports.myMutation = async (parent, args, { db }) = {
//     ...
//   }
//
// Insert new records with db.run:
//
//   await db.run("INSERT INTO table (col1, col2) VALUES (?, ?)", [val1, val2]);
//
// ...and finally single records using db.get:
//
//   const record = await db.get("SELECT * FROM table WHERE col1 = ?", val1);

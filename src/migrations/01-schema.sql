CREATE TABLE organisations (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL
);

CREATE TABLE employees (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  organisationId INTEGER NOT NULL,
  managerId      INTEGER,
  firstName      text NOT NULL,
  lastName       text NOT NULL,
  gender         INTEGER NOT NULL,
  FOREIGN KEY(organisationId) REFERENCES organisations(id),
  FOREIGN KEY(managerId) REFERENCES employees(id)
);

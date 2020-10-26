INSERT INTO organisations (id, name) VALUES
  (1, 'Alten'),
  (2, 'Nedap');

INSERT INTO employees (id, organisationId, managerId, firstName, lastName, gender) VALUES
  (1,  1,    3, 'Piet',       'de Jong',   1),
  (2,  1,    3, 'Jeroen',     'Koning',    1),
  (3,  1, NULL, 'Ellen',      'Visser',    2),
  (4,  1,    6, 'Jacqueline', 'Bakker',    2),
  (5,  1,    6, 'Willem',     'van Dijk',  1),
  (6,  1, NULL, 'Sanne',      'Smit',      2),
  (7,  2,    8, 'Johan',      'Mulder',    1),
  (8,  2, NULL, 'Jan',        'de Vries',  1),
  (9,  2,   11, 'Marit',      'Meijer',    2),
  (10, 2,   11, 'Karin',      'Bosman',    2),
  (11, 2, NULL, 'Aart',       'Kemperman', 1);

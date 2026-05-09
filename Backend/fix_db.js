const db = require('./db');

const alterQuery = `
  ALTER TABLE customer
  RENAME COLUMN Name TO CustomerName,
  ADD COLUMN Phone varchar(15),
  ADD COLUMN Address varchar(255);
`;

db.query(alterQuery, (err, result) => {
  if (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist! Moving on.');
    } else if (err.code === 'ER_BAD_FIELD_ERROR') {
      console.log('Name column might already be renamed or missing.');
      console.log(err);
    } else {
      console.log('Error:', err);
    }
  } else {
    console.log('Database schema successfully updated!');
  }
  process.exit();
});

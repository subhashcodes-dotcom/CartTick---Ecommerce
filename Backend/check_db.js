const db = require('./db');

db.query('DESCRIBE customer', (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  process.exit();
});

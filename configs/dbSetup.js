const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/i-Drink';
//const dbUrl = 'mongodb://localhost:27017/i-Drink';
mongoose.connect(dbUrl);
const db = mongoose.connection;
module.exports = {
  db,
  dbUrl,
};

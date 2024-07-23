const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const dbConfig = {
  user: 'stu',
  password: 'Admin@311',
  server: 'localhost',
  database: 'STUDENT',
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};
console.log('Database Configuration:', dbConfig);
module.exports = dbConfig;

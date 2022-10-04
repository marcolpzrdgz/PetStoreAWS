const sql = require("mysql2");
const dbConfig = require("./db.config");

const pool = sql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = async (sql, args) => {
  try {
    const result = await pool.query(sql, args);
    return result[0];
  } catch (e) {
    console.log(e);
  } 
};


const query = require("../database.js");

module.exports = {
  
  api: async (req, res) => {
  //api: app.get('/:userid', (req, res) => {
    try {
      const nameP = req.params.nameP;
     // const id = req.body.id;
      if (nameP) {query1 = `SELECT * FROM pet WHERE name = '${nameP}'`;} 
      else {query1 = "SELECT * FROM pet ";}
      const result = await query(query1, (err, rows) => {
        if (err) { throw err;}
        if (rows.length === 0) {
          return res.status(400).send({status: 400, message: "no record found",data: rows,});
        }
        else {
          return res.status(200).send({status: 200, message: "Success", data: rows,});
        }
      });
    } catch (err) {
      return res.status(500).send({status: 500, message: "failure", reason: "something went wrong",error: err.message,
      });
    }
  },
};
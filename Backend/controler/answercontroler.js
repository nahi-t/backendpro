const db = require("../db/dbconfig.js");
const jwt=require('jsonwebtoken')


    async function givanswer(req, res) {
        const { answer, id, userid } = req.body;
      
        if (!answer || !id || !userid) {
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        try {
          const sql = "INSERT INTO answer (answer, id, userid) VALUES (?, ?, ?)";
          const [result] = await db.query(sql, [answer, id, userid]);
      
          res.status(201).json({ message: "Answer saved", id: result.insertId });
        } catch (err) {
          console.error("Full DB Error:", err); // Show full error
          res.status(500).json({ error: "Internal server error" });
        
        }
      }
      
async function seeA(req,res) {
  const id = req.params.id;
  console.log("Getting answers for question ID:", id); 
        try {
          const sql = `
          SELECT 
  a.answer,
  u.username AS username,
  q.title AS title,
  q.description AS description
  FROM answer a
  JOIN users u ON a.userid = u.userid
 JOIN question q ON a.id = q.id
 where q.id=?
 


          `;
      
          const [results] = await db.query(sql,[id]);
          res.status(200).json(results);
          console.log(results)
        } catch (err) {
          console.error("🔴 Error in seeA:", err); // Show full error
          res.status(500).json({ error: "Internal server error from see" });
          console.log(results)
        }
 } 
 
module.exports={givanswer,seeA}
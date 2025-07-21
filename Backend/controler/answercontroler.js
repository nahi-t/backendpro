const db = require("../db/dbconfig.js"); // your pg Pool or Client
const jwt = require('jsonwebtoken');

async function givanswer(req, res) {
  const { answer, id, userid } = req.body;

  if (!answer || !id || !userid) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = "INSERT INTO answer (answer, id, userid) VALUES ($1, $2, $3) RETURNING *";
    const result = await db.query(sql, [answer, id, userid]);

    // result.rows[0] contains the inserted row
    res.status(201).json({ message: "Answer saved", id: result.rows[0].id });
  } catch (err) {
    console.error("Full DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function seeA(req, res) {
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
      WHERE q.id = $1
    `;

    const result = await db.query(sql, [id]);
    res.status(200).json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error("🔴 Error in seeA:", err);
    res.status(500).json({ error: "Internal server error from see" });
  }
}

module.exports = { givanswer, seeA };

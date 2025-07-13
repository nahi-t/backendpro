const db = require("../db/dbconfig.js");




async function askq(req, res) {
  if (!req.body) {
    return res.status(400).json({ msg: "Missing request body" });
  }

  const userid = req.user.userid; 
  const token=req.user.token
  const { title, description } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ msg: "Please provide all required fields." });
    
  }

  try {
    await db.query(
      "INSERT INTO question (userid, title, description) VALUES (?, ?, ?)",
  [userid, title, description]
    );

    return res.status(201).json({
      msg: "Question added successfully",
      token
    });
  } catch (err) {
    console.log("Insert question error:", err);
    return res.status(500).json({ msg: "Server error during question add" });
  }
}

   

 async function storeq(req, res) {

  try {
    const [results] = await db.query(
      `SELECT 
  title,
  description,
  id,
  u.username AS username
FROM 
  question q
JOIN 
  users u ON q.userid = u.userid;`
    );

    res.status(200).json(results); 
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
 }

module.exports = { askq,storeq };
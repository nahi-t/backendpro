const db = require("../db/dbconfig.js");
const jwt=require('jsonwebtoken')

// User Registration
async function reg(req, res) {
    const { username, fname, lname, email, password } = req.body;

    // Validate required fields
    if (!username || !fname || !lname || !email || !password) {
        return res.status(400).json({ msg: "Please provide all required fields." });
    }

    try {
        // Check if user already exists
        const [userExists] = await db.query(
            "SELECT username, userid FROM users WHERE username = ? OR email = ?",
            [username, email]
        );

        
        if (userExists.length > 0) {
            return res.status(409).json({ 
                msg: "Username or email already exists.",
               // Optional: Return which field exists
            });
        }
        if (password.length <= 8) {
            return res.status(409).json({ 
                msg: "password is must greater than 8.",
               // Optional: Return which field exists
            });
        }

        // Insert new user into DB
        const newUser = await db.query(
            "INSERT INTO users (username, fname, lname, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, fname, lname, email, password] // In production, use hashedPassword
            
        );
      

      return  res.status(201).json({ 
            msg: "User registered successfully!",
         
        });

    } catch (err) {
        console.error("Registration error:", err);
      return  res.status(500).json({ msg: "Server error during registration." });
    }
 }

// User Login
async function login(req, res) {
 const   { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "email and pasword required." });
    }

    try {
        const [user] = await db.query(
            "SELECT userid,username,password FROM users WHERE email = ?  ",
            [email]
        );
     if (user.length==0) {
        return res.status(400).json({ msg: "invalid credential" });
     }
     if (password!==user[0].password) {
        return res.status(400).json({ msg: "invalid password or email" });
     }
   
     const username = user[0].username;
     const userid = user[0].userid; 
     const token = jwt.sign({ username, userid }, "process.env.JWT_SECRATE", { expiresIn: "1d" }); 
     return res.status(200).json({ msg: "user log in successful", token ,username}); 

    } catch (err) {
        console.error("Login error:", err);
      return  res.status(500).json({ msg: "Server error during login." });
    }
}

// Check User (example)
async function checkUser(req, res) {
   try {
    const username = req.user.username;
  
    const userid = req.user.userid; // Use 'userid' (lowercase 'id')
    res.status(200).json({ msg: "Valid user", username, userid });
   } catch (error) {
    return res.status(400).json({msg:"somtin wrong to chaking"})
   } // Return 'userid'
}
module.exports = { reg, login, checkUser }

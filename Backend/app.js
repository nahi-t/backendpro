require("dotenv").config()
const express=require("express")
const app=express();
const cors = require('cors');
const port=5000
const userroute=require("./routes/userRout.js")
const qustionrout=require('./routes/qustionrout.js')
const answerRout = require("./routes/answerRout.js")
const db=require("./db/dbconfig.js")

// midle ware to use
app.use(cors());
// to extract json data
app.use(express.json()); // For parsing application/json
//  app.use(express.urlencoded({ extended: true }));
app.use("/api/user",userroute)
app.use("/api/qustion",qustionrout)
app.use("/api/answer",answerRout)

async function start() {
    
    try {
        const result = await db.execute("SELECT 'test'"); // Test DB connection
        console.log("DB test result:conected", result);
        
        app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
      } catch (error) {
        console.error("Error starting server:", error);
      }
}

start()
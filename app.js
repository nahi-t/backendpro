require("dotenv").config()
const express=require("express")
const app=express();
const port=5001
const userroute=require("./routes/userRout.js")
const db=require("./db/dbconfig.js")
// midle ware to use

// to extract json data
app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true }));
app.use("/api/user",userroute)

async function start() {
    
try {
    const result= await db.execute("select 'test'")
     console.log(result)
     app.listen(port)
     console.log("connected")
 } catch (error) {
    console.log('somting is incorrect in app.js') 
 }
}

start()
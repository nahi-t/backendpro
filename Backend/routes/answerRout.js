const express=require("express")
const route=express.Router()
const { givanswer,seeA } =require("../controler/answercontroler.js")
const auth=require("../midleware/auth.js")


route .post("/answer",givanswer)
route .get("/getanswer/:id",seeA)
module.exports=route
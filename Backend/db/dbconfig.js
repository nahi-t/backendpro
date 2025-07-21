const{Pool}=require("pg")

const dbconnection= new Pool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:"localhost",
    password:process.env.PASSWORD,
    port:process.env.PORT || 5432, // Default PostgreSQL port is 5432, but can be overridden by .env
    connectionLimit:10
})

// dbconnection.execute("select 'test'",(err,result)=>{
//     if(err){
//         console.log(err.mesage)
//     } else{
//         console.log(result)
//     }
// })
module.exports=dbconnection
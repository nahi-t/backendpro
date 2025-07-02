const jwt =require("jsonwebtoken")


function auth(req,res,next) {
   const authHeader=req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer ')){ 
      return res.status(400).json({msg:"auth faild1"})
    }
   const token = authHeader.split(' ')[1];
   if (!token) {
      return res.status(401).json({ msg: "Authentication token missing" }); // 401 Unauthorized
  }
   try {
      const decodedPayload = jwt.verify(token, "process.env.JWT_SECRATE"); // Or 'token' if you extract it
      console.log("Decoded Payload:", decodedPayload);
      const { username, userid } = decodedPayload;
      console.log("User ID from destructuring:", userid);
      req.user = { username, userid };
      next();
  } catch (error) {
      console.error("Authentication Error:", error); // Log the actual error
      return res.status(400).json({ msg: "auth failed" });
  }
}
module.exports=auth
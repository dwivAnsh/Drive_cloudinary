const jwt = require("jsonwebtoken");

function auth(req,res,next){ //Its based on token saved in cookies
    const token = req.cookies.token;
    if(!token){ // If token is not present
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // Verifying the token 
        req.user = decoded; // user.routes.js
        next();
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports = auth;
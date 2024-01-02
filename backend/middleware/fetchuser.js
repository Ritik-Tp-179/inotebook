const jwt = require('jsonwebtoken');
const JWT_SECRET = "RitikIsGoodBoy"


const fetchuser = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"PLease authenticate with a valid token incorrect"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"PLease authenticate with a valid token"});
    }
}


module.exports = fetchuser;
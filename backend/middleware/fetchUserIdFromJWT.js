const jwt = require('jsonwebtoken')
// in middleware we will paly with req,res,next
const fetchUserIdFromJWT = (req,res,next)=>{
    const token = req.header('jwt_auth_token');
    try {
        if(!token){
            return res.status(401).json({error: 'please authenticate using valid token!'})
        }
        const jwt_sign_key = "hello jwt"
        const data = jwt.verify(token, jwt_sign_key); // data/ payload is available 
        req.user = data.user
        // console.log('launch next() function')
        next(); // means async (req,res) function 
        
    } catch (error) {
        res.status(401).json({error: "invalid token please authenticate with valid token"})
    }
}
module.exports = fetchUserIdFromJWT;
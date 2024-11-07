const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    try {
        const jwtResponse = jwt.verify(token,"secretkey")
        console.log(jwtResponse);
        res.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json('authorization failed due to', error)

    }
    next()
}

module.exports = jwtMiddleware
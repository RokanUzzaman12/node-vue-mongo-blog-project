const jwt = require('jsonwebtoken')
const checkLogin = (req,res,next)=>{
    const {authorization} = req.headers;

    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,'secrate')
        const user = decoded
        req.userInfo = user
        next()
        
    }catch(err){
        console.log(err)
        next("authorization error")
    }
}

module.exports = checkLogin
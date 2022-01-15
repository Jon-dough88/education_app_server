const jwt = require('jsonwebtoken');

const authenticateRefreshToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const refreshToken = authHeader && authHeader.split(' ')[1]
    // if(refreshToken === null) {
    //     return res.sendStatus(401).send('Access denied')
    // } else {
         const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
           if(err){
               res.sendStatus(403).send({message: "Access denied"})
           }else {
           req.user = verified
           
            next();
             
           }
        })
//    }
}

module.exports = authenticateRefreshToken


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) {
        return res.sendStatus(401).send('Access denied')
    } else {
         const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { 
           if(err){
               res.sendStatus(403).send({message: "Access denied"})
           }else {
           req.user = verified
           
            next();
             
           }
        })
   }
}

module.exports = authenticateToken


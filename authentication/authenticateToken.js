const jwt = require('jsonwebtoken');

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

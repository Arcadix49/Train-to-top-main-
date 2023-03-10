import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {

    const header = req.headers.authorization
   
    if(!header) {
       return res.status(401).json({ message: 'Invalid'});
     
    } 
    const token = header.split(' ')[1]

    jwt.verify(token, "key_secret", async (err, decoded) => {
      if (err) {
          res.status(403).send({message: "Unauthorized!"});
          return
      }

      req.userID = decoded.id
      next()
  });

}
// verifyTeam  
const verifyTeam = (req, res, next) => {

}
export const auth = {
    verifyToken
}
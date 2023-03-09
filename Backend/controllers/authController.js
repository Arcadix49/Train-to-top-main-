import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
          pseudo: req.body.pseudo,
          email: req.body.email,
          age: req.body.age,
          role: req.body.role,
          image: req.body.image,
          password: hash,
        })
        const jwt = user.createJWT()
        user.save()
        .then((user) => res.status(201).json({user, jwt}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({ error }));
}

export const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }

          const token = user.createJWT();

          res.json({ user, token });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
};

export const verifyToken = (req, res) => {

    const header = req.headers.authorization
   
  console.log(req.headers)
    if(!header) {
       return res.status(401).json({ message: 'Invalid'});
     
    } 
    const token = header.split(' ')[1]

    jwt.verify(token, "key_secret", async (err, decoded) => {
      if (err) {
          res.status(403).send({message: "Unauthorized!"});
          return
      }
      const user = await User.findOne({_id: decoded.id})
      res.status(200).json({
          user: {
              id: user._id,
              email: user.email,
          }
      })
  });


}
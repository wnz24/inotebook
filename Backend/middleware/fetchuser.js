const jwt = require('jsonwebtoken');
const JWT_SECRET = "harry is good"

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id ti the object
    const token = req.header('auth-token')
    if (!token) {
       return  res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
    } catch (error) {
      return  res.status(401).send({ error: "please authenticate using a valid token" })
    
    }
    
}


module.exports = fetchuser;
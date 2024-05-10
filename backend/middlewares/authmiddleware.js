const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  console.log(token);  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).send("Could not verify token");
      // Call next(err) here to propagate the error to the error handling middleware or the next middleware in the chain
      // return next(err);
    }
    req.user = user;
    // Call next() here to pass control to the next middleware in the chain
    next();
  });
}

module.exports = authenticate;

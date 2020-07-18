const jwt = require('jsonwebtoken');

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

function authenticate() {
  return async (req, res, next) => {
    try {
      const token = req.headers.cookie
      if (!token) {
        return res.status(401).json({
          message: 'Invalid credentials'
        })
      } else {
        next()
      }



      // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      //   if (err) {
      //     return res.status(401).json({
      //       message: 'Invalid credentials'
      //     })
      //   } else {
      //     next();
      //   }
      // })


      
    } catch(err) {
      console.log('Error: ', err)
    }
  }
}

module.exports = authenticate
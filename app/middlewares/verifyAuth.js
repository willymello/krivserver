const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {errorMessage, status} = require('../helpers/status')


dotenv.config()

//verify token

const verifyToken = async (req,res,next) =>{
  const {token} = req.headers
  if(!token) {
    errorMessage.error = 'Token not provided, return to the Shire'
    return res.status(status.bad).send(errorMessage)
  }
  try {
    const decoded = jwt.verify(token, process.env.KRIV_SECRET)
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      godMode: decoded.godMode,
      first_name: decoded.first_name,
      last_name: decoded.last_name
    }
    next()
    
  } catch (error) {
    errorMessage.error = 'Authentication Failed'
    return res.status(status.unauthorized).send(errorMessage)
  }
}

module.exports = {verifyToken}
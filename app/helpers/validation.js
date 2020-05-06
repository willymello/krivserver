
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//hash password
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = password => bcrypt.hashSync(password,salt)

//compare password
const comparePassword = (hashedPassword, password) =>{
  return bcrypt.compareSync(password, hashedPassword)
}


// validate email
const isValidEmail = (email) =>{
  const regEx = /\S+@\S+\.+/
  return regEx.test(email)
}

// validate password

const validatePassword = (password) =>{
  if (password.length<=5 || password === ''){
    return false
  }
  return true
}

const isEmpty = (input) =>{
  if (input === undefined || imput === ''){
    return true
  }
  if (input.replace(/\s/g, '').length){
    return false
  }
  return true
}

const empty = (input) =>{
  if (input === undefined || input === '') {
    return true
  }
}

//generate user token using JWT

const generateUserToken = (email, id, godMode, first_name, last_name) => {
  const token = jwt.sign({
    email,
    user_id:id,
    godMode,
    first_name,
    last_name
  },
  process.env.KRIV_SECRET, {expiresInL: '3d'})
  return token
}

module.exports = {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  hashPassword,
  comparePassword,
  generateUserToken
}

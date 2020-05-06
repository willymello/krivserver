import moment from  'moment'
import dbQuery from '../db/dev/dbQuery'
import db from '../db/database'

import {
  hashPassword,
  comparePassword,
  isEmpty,
  isValidEmail,
  validatePassword,
  generateUserToken
} from '../helpers/validation'

import {
  errorMessage,
  successMessage,
  status
} from '../helpers/status'

const User = require('../db/user')
//create a User

const createUser = async (req,res,next) => {
  const {
    email, first_name, last_name, password
  } = req.body

  const created_on = moment(new Date())
  if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
    errorMessage.error = 'Email, password, firstname and lastname field can not be empty'
    return res.status(status.bad).send(errorMessage)
  }
if(!isValidEmail(email)){
  errorMessage.error = 'Please enter a valid email'
  return res.status(status.bad).send(errorMessage)
}

if(!validatePassword(password)){
  errorMessage.error = 'Password must be more than 5 characters fool of a Took'
  return res.status(status.bad).send(errorMessage)
}

  const hashedPassword = hashPassword(password)
  const newUser = {email, first_name, last_name, password: hashedPassword, created_on}
  try {
    const userCreationRequest = await User.create(newUser)
    delete userCreationRequest.password
    const token  = generateUserToken(userCreationRequest.email, userCreationRequest.id, userCreationRequest.godMode, userCreationRequest.first_name, userCreationRequest.last_name)
    successMessage.data = userCreationRequest
    successMessage.data.token = token
    return res.status(status.created).send(successMessage)
   //add error logginh and 
  } catch (error) {
    errorMessage.error = 'Operation not successful'
    return res.status(status.error).send(errorMessage)
  }
}

//signInuser
const signInUser = async (req,res) => {
  const {email, password} = req.body
  if(isEmpty(email) || isEmpty(password)){
    errorMessage.error = 'Email or Password detail is empty'
    return res.status(status.bad).send(errorMessage)
  }
  if(!isValidEmail(email) || !validatePassword(password)){
    errorMessage.error = 'Email of Password is incorrect'
    return res.status(status.notfound).send(errorMessage)
  }
  try {
    const specificUser = await User.findAll({
      where: {email :email}
    })
    if(!specificUser){
      errorMessage.error = 'A user with that email could not be found'
      return res.status(status.notfound).send(errorMessage)
    }
    if(!comparePassword(specificUser.password, password)){
      errorMessage.error = 'Incorrect Password'
      return res.status(status.bad).send(errorMessage)
    }
    const token = generateUserToken(specificUser.email, specificUser.id, specificUser.godMode, specificUser.first_name, specificUser.last_name)
    delete specificUser.password
    successMessage.data = specificUser
    successMessage.data.token = token
    return res.status(status.success).send(successMessage)
  } catch (error) {
    errorMessage.error = 'Operation Unsuccessful'
    return res.status(status.error).send(errorMessage)
  }
}

export {
  createUser,
  signInUser
}


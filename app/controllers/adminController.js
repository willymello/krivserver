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

const createAdmin = async (req,res,next) => {
  const {
    email, first_name, last_name, password
  } = req.body

  const {godMode} = req.user

  const created_on = moment(new Date())
  const godModeOn = true

  if(!godMode === false){
    errorMessage.error = 'Sorry you are unauthorized to create a GodMode account'
    return res.status()
  }

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
  const newAdmin = {email, first_name, last_name, godMode:godModeOn, password: hashedPassword, created_on}
  try {
    const adminCreationRequest = await User.create(newAdmin)
    delete adminCreationRequest.password
    const token  = generateUserToken(adminCreationRequest.email, adminCreationRequest.id, adminCreationRequest.godMode, adminCreationRequest.first_name, adminCreationRequest.last_name)
    successMessage.data = adminCreationRequest
    successMessage.data.token = token
    return res.status(status.created).send(successMessage)
   //add error logginh and 
  } catch (error) {
    errorMessage.error = 'Operation not successful'
    return res.status(status.error).send(errorMessage)
  }
}

//update a user to admin, updateUserToAdmin

const giveUserGodMode = async (req,res) =>{
  const {id} = req.params
  const {godModeOn} = req.body

  const {godMode} = req.user

  if(godMode !== true ){
    errorMessage.error = 'Sorry you must be an admin to upgrade a user'
    res.status(status.unauthorized).send(errorMessage)
  }

  try {
    const specificUser = await User.findById(id)
    if(!specificUser){
      errorMessage.error = 'User cannot be found'
      return res.status(status.notfound).send(errorMessage)
    }
    const newAdmin = await User.update({
      godMode: true
    },
    {where: {
      id:id
      }
    })
    delete newAdmin.password
    successMessage.data = newAdmin
    return res.status(status.success).send(successMessage)
  } catch (error) {
    errorMessage.error = 'Operation unsuccessful'
    return res.status(status.error).send(errorMessage)
  }
}

export {
  createAdmin,
  giveUserGodMode
}


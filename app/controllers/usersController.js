import moment from  'moment'
import dbQuery from '../db/dev/dbQuery'

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

//create a User

const createUser = async (req,res) => {
  const {
    email, first_name, last_name, password
  } = req.body

  
}
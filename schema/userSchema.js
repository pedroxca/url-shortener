const yup = require('yup');


const userSchema = yup.object().shape({
  username: yup.string().min(1).max(25).required(),
  password: yup.string().min(1).required(),
  email: yup.string().email().required(),
})

module.exports = userSchema;
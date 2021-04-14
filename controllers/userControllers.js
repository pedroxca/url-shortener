const userSchema = require('../schema/userSchema');
const pool = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

async function getAllUsers() {
  const users = await pool.query('SELECT * FROM users').rows;
  return users
}


module.exports.getRegisterpage = async (req, res) => {
  res.render('register.ejs');
}
module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userSchema.validate({ username, email, password })
    const hashedPassword = await bcrypt.hash(password, 13)
    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES($1,$2,$3) RETURNING *', [username, email, hashedPassword]);
    console.log(newUser.rows[0]);
    res.redirect('/login');
  } catch (err) {
    res.redirect('/register');
  }
  console.log(await getAllUsers());
}
module.exports.getLoginPage = async (req, res) => {
  res.render('login.ejs');
}
module.exports.loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
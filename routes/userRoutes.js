const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/userControllers');
const checkNotAuthenticated = require('../middlewares/checkNotAuthenticated');


router.route('/login')
  .get(checkNotAuthenticated, userContollers.getLoginPage)
  .post(checkNotAuthenticated, userContollers.loginUser)
router.route('/register')
  .get(checkNotAuthenticated, userContollers.getRegisterpage)
  .post(checkNotAuthenticated, userContollers.registerUser)

//add Middleware


module.exports = router;



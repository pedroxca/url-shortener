const express = require('express');
const router = express.Router();
const shortenerContoller = require('../controllers/shortenerControllers');
const checkAuthenticated = require('../middlewares/checkAuthenticated');

router.route('/')
  .get(checkAuthenticated,shortenerContoller.getHomePage)
  .post(shortenerContoller.createNewSlug);
router.route('/error')
  .get(shortenerContoller.getErrorPage);
router.route('/:id')
  .get(shortenerContoller.redirectToUrlBySlug);


module.exports = router;



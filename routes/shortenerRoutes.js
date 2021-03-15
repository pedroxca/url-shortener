const express = require('express');
const router = express.Router();
const shortenerContoller = require('../controllers/shortenerControllers');

router.route('/url')
  .post(shortenerContoller.createNewSlug);
router.route('/:slug')
  .get(shortenerContoller.redirectToUrlBySlug);

module.exports = router;



const express = require('express');
const router = express.Router();
const shortenerContoller = require('../controllers/shortenerControllers');

router.route('/:id')
  .get(shortenerContoller.redirectToUrlBySlug);
router.route('/url')
  .post(shortenerContoller.createNewSlug);

module.exports = router;



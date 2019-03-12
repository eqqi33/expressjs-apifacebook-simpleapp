var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('login');
});
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/auth/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
module.exports = router;

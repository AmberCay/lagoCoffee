const {Router} = require('express');
const router = Router();
const userCTRL = require('../controllers/user.controllers');

router.post("/login", userCTRL.postUserLogin)

router.post("/register", userCTRL.postUserRegister)

module.exports = router;
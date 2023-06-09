const {Router} = require('express');
const router = Router();
const itemsCTRL = require('../controllers/item.controllers');

router.get("/", itemsCTRL.getStart)

router.get("/coffee", itemsCTRL.getCoffee)

module.exports = router
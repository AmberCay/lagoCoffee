const {Router} = require('express');
const router = Router();
const itemsCTRL = require('../controllers/item.controllers');

router.get("/", itemsCTRL.getStart)

router.get("/coffee", itemsCTRL.getCoffee)

router.get("/tea", itemsCTRL.getTea)

router.get("/item", itemsCTRL.getItem)

module.exports = router
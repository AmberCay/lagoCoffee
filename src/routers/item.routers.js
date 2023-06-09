const {Router} = require('express');
const router = Router();
const itemsCTRL = require('../controllers/item.controllers');

router.get("/", itemsCTRL)

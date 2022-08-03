const express = require('express');
const router = express.Router();
const {registerUser} = require('../controller/register.controller');

router.post('/',registerUser);


module.exports = router;
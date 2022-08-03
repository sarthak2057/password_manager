const express = require('express');
const router = express.Router();
const {handleAuth} = require('../controller/auth.controller');

router.post('/',handleAuth);

module.exports = router;
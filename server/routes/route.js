const express = require("express");
const router = express.Router();

const {
    SignUp,
    LogIn
} = require('../controllers/auth');

router.post('/sign-up',SignUp);
router.post('/log-in',LogIn);


module.exports = router;
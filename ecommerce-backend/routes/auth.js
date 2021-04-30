const express = require('express');
const router = express.Router();


// Routes
const { signin, signup, signout, requireSignin } = require('../controller/auth');

const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin)
router.get('/signout', signout)



module.exports = router;
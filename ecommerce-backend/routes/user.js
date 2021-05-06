const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById, read, update, purchaseHistory } = require('../controller/user');

// Routes
router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {
    res.json({
        user: req.profile
    });
    //console.log(req)
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
router.put('/user/:userId', requireSignin, isAuth, update);


// Params
router.param('userId', userById);


module.exports = router;
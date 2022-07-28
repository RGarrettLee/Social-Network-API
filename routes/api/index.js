const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute.js');
const userRoute = require('./userRoute.js');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);


module.exports = router;
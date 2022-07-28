const router = require('express').Router();
const thoughtsRoutes = require('./thoughtRoute.js');
const userRoutes = require('./userRoute.js');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);


module.exports = router;
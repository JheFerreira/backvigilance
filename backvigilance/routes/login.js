let express = require('express');
let router = express.Router();
let controller = require('../controllers/login');

/* GET users listing. */

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);


module.exports = router;
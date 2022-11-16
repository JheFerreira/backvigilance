let express = require('express');
let router = express.Router();
let controller = require('../controllers/users');

/* GET users listing. */

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserByID);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;

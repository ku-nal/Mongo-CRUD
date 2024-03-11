const express = require('express');
const UserController = require('./user-controller');
userController = new UserController();

const router = express.Router();


router.post('/add',userController.createUser);
router.get('/users', userController.getAll);
router.get('/user/:id',userController.get);
router.put('/update/:id',userController.updateUser);

module.exports = router;
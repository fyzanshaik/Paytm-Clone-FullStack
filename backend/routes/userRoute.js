const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authCheck = require('../middleware/authCheck');

router.post('/user/signup', authController.signup);
router.post('/user/signin', authController.signin);
router.put('/user/updateUser', authCheck, userController.updateUser);
router.get('/user/username',authCheck,userController.getUserName)
router.get('/user/bulk', authCheck,userController.getAllUsers);
router.get('/user/',authCheck ,userController.getUserWithFilter);

module.exports = router;

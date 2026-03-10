const express = require('express')
const router = express.Router()
const userAuthController = require('../controller/authController')
const authCheck = require('../middleware/authCheckMiddleware')

router.post('/register', userAuthController.register)
router.post('/login/user', userAuthController.login)

router.use(authCheck)
router.get('/user', userAuthController.user)

module.exports = router
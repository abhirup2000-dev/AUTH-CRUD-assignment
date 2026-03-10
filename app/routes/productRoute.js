const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const authCheck = require('../middleware/authCheckMiddleware')


router.use(authCheck)
router.post('/create-product', productController.createProduct)
router.get('/product', productController.getAllProduct)
router.put('/product/update/:id', productController.updateProduct)
router.delete('/product/delete/:id', productController.deleteProduct)

module.exports = router
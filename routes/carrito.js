const { Router } = require('express');
const { 
    addCart,
    deleteCart,
    getProductsCart,
    addProductsCart,
    deleteProductCart,
 } = require('../controllers/carrito');

const router = Router();

router.post('/',addCart)
router.delete('/:id',deleteCart)
router.get('/:id/productos',getProductsCart)
router.post('/:id/productos',addProductsCart)
router.delete('/:id/productos/:id_prod',deleteProductCart)

module.exports = router;
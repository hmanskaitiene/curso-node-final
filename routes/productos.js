const { Router } = require('express');
const { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
 } = require('../controllers/productos');

const { esAdmin } = require('../middlewares/validar-admin');

const router = Router();

router.get('/:id?',getProducts)
router.post('/',esAdmin ,addProduct)
router.put('/:id',esAdmin,updateProduct)
router.delete('/:id',esAdmin,deleteProduct)


module.exports = router;
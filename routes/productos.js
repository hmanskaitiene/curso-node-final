const { Router } = require('express');
const { 
    getProducts,
    addProducts,
    updateProduct,
    deleteProduct,
 } = require('../controllers/productos');

const { esAdmin } = require('../middlewares/validar-admin');

const router = Router();

router.get('/:id?',getProducts)
router.post('/',esAdmin ,addProducts)
router.put('/:id',esAdmin,updateProduct)
router.delete('/:id',esAdmin,deleteProduct)


module.exports = router;
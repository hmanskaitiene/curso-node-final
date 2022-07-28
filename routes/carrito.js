import { Router } from 'express';
import { 
    addCart,
    deleteCart,
    getProductsCart,
    addProductsCart,
    deleteProductCart,
    finishOrder,
 } from '../controllers/carrito.js';

const router = Router();

router.post('/',addCart)
router.delete('/:id',deleteCart)
router.get('/:id/productos',getProductsCart)
router.post('/:id/productos',addProductsCart)
router.delete('/:id/productos/:id_prod',deleteProductCart)
router.put('/:idCart/usuario/:idUser',finishOrder)

export default router;
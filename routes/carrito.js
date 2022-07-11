import { Router } from 'express';
import { 
    addCart,
    deleteCart,
    getProductsCart,
    addProductsCart,
    deleteProductCart,
 } from '../controllers/carrito.js';

const router = Router();

router.post('/',addCart)
router.delete('/:id',deleteCart)
router.get('/:id/productos',getProductsCart)
router.post('/:id/productos',addProductsCart)
router.delete('/:id/productos/:id_prod',deleteProductCart)

export default router;
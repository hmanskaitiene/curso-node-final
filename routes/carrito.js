import { Router } from 'express';
import carritosController from  '../controllers/carrito.js';
import { validarJWT } from '../middlewares/auth-check.js';
const router = Router();

router.post('/',validarJWT, carritosController.addCart)
router.delete('/:id',validarJWT, carritosController.deleteCart)
router.get('/:id/productos',validarJWT, carritosController.getProductsCart)
router.post('/:id/productos',validarJWT, carritosController.addProductsCart)
router.delete('/:id/productos/:id_prod',validarJWT, carritosController.deleteProductCart)
router.get('/email/:email',validarJWT, carritosController.getCartByEmail)

export default router;
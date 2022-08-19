import { Router } from 'express';
import productsController from '../controllers/productos.js';
import { validarJWT, esAdmin } from '../middlewares/auth-check.js';
const router = Router();

router.get('/:id?',validarJWT, productsController.getProducts)
router.get('/categoria/:categoria',validarJWT, productsController.getProductsCategory)
router.post('/',[validarJWT, esAdmin] ,productsController.addProducts)
router.put('/:id',[validarJWT, esAdmin],productsController.updateProduct)
router.delete('/:id',[validarJWT, esAdmin],productsController.deleteProduct)


export default router;
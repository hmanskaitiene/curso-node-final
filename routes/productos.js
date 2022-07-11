import { Router } from 'express';

import { 
    getProducts,
    addProducts,
    updateProduct,
    deleteProduct,
 }  from '../controllers/productos.js';

import { esAdmin } from '../middlewares/validar-admin.js';

const router = Router();

router.get('/:id?',getProducts)
router.post('/',esAdmin ,addProducts)
router.put('/:id',esAdmin,updateProduct)
router.delete('/:id',esAdmin,deleteProduct)


export default router;
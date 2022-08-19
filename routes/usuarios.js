import { Router } from 'express';
import userController from '../controllers/usuarios.js';
import { validarJWT } from '../middlewares/auth-check.js';
const router = Router();

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.put('/:id',validarJWT, userController.userUpdate)
router.post('/userImage/:id',validarJWT, userController.userImage)

export default router;
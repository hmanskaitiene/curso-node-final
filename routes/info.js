import { Router } from 'express';
import infoController from '../controllers/info.js';
import { validarJWT, esAdmin } from '../middlewares/auth-check.js';
const router = Router();

router.get('/',[validarJWT, esAdmin],infoController.getInformation)


export default router;
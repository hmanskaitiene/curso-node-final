import { Router } from 'express';
import msgController from '../controllers/mensaje.js';
import { validarJWT } from '../middlewares/auth-check.js';
const router = Router();

router.post('/',validarJWT, msgController.createMensaje);
router.get('/senders',validarJWT, msgController.getMensajesSenders);
router.get('/:email',validarJWT, msgController.getMensajesByEmail);



export default router;
import { Router } from 'express';
import { dashboard, profile, userUpdate,cart,userImageUpload
} from '../controllers/shop.js';
const router = Router();

router.get('/dashboard', dashboard)
router.get('/profile', profile)
router.post('/userUpdate', userUpdate)
router.post('/userImageUpload', userImageUpload)
router.get('/cart', cart)

/*
TODO: Cuando efectue la compra:
Enviar email
El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto 
la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. 
En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido 
ha sido recibido y se encuentra en proceso.
*/
export default router;
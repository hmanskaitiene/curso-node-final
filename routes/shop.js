import { Router } from 'express';
import shopController from '../controllers/shop.js';
const router = Router();

router.get('/',(req, res) => {res.redirect("/login");})
router.get('/login',shopController.login)
router.get('/logout',shopController.logout)
router.get('/signup',shopController.signup);
router.get('/productos',  shopController.dashboard)
router.get('/profile', shopController.profile)
router.get('/carrito', shopController.cart)
router.get('/orden', shopController.orders)
router.get('/producto/:id?', shopController.producto)
router.get('/chat/:email', shopController.chat)
router.get('/chat', shopController.chats)
router.get('/stock', shopController.stock)
router.get('/info', shopController.info)
router.get('/productos/categoria/:categoria', shopController.categoria)

export default router;
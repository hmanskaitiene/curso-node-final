import passport from 'passport';
import { Router } from 'express';
import { 
    login,signup,logout, signupPost, 
    loginPost, failLoginDisplay, failSignupDisplay, 
    signupError, loginError
} from '../controllers/auth.js';
const router = Router();

router.get('/',(req, res) => {res.redirect("/login");})
router.get('/login',login)
router.post('/login',passport.authenticate('login', {failureRedirect:'/fLogin'}),loginPost)
router.get('/logout',logout)
router.get('/signup',signup);
router.post('/signup',passport.authenticate('register', {failureRedirect:'/fRegister'}),signupPost)
router.get('/fRegister', signupError)
router.get('/fLogin', loginError)
router.get('/failLogin', failLoginDisplay)
router.get('/failSignup', failSignupDisplay)

export default router;
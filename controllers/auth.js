import { enviarMailAdministrador } from '../utils/mailer.js';

const login = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const loginPost = (req, res) => {
    res.status(200).json({
        message:'Acceso autorizado',
        userId: req.user.id,
        authenticated: true
    })
}

const signup = (req, res) => {
    res.render("pages/signup", {
        loggedIn: false,
    });
}

const signupPost = async (req, res) => {
    //Notificacion al administrador
    enviarMailAdministrador('nuevoRegistro', 'Nuevo registro', req.body)
    res.status(200).json({
        message:'Usuario registrado',
        userId: req.user.id,
        registered: true
    })
}

const logout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.nombre;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                loggedIn: false,
                userName: name,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}

const loginError = (req, res) => {
    res.status(400).json({
        message:'Acceso no autorizado',
        authenticated: false
    })
}

const signupError = (req, res) => {
    res.status(400).json({
        message:'No se pudo registrar el usuario',
        registered: false
    })
}

const failLoginDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const failSignupDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}

export {
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    failLoginDisplay,
    failSignupDisplay, 
    loginError,
    signupError,
}

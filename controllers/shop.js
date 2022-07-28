import User from "../models/user.js"; 
import cloudinary from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL);

const dashboard = (req, res) => {
    res.render("pages/dashboard", {
        userLogged: req.user,
        loggedIn: true,
    });
}

const profile = (req, res) => {
    res.render("pages/profile", {
        userLogged: req.user,
        loggedIn: true,
    });
}

const userUpdate = async (req, res) => {
    let user = await User.findOneAndUpdate({ _id: req.user.id },req.body);
    let message,updated;

    if (user) {
        message = 'Usuario actualizado';
        updated = true;
    } else {
        message = 'No se pudo actualizar el usuario';
        updated = false;
    }

    res.status(200).json({
        message,
        updated
    })
}

const userImageUpload = async (req, res) => {

    let user = await User.findById({ _id: req.user.id });

    //Se borra la imagen en el caso que exista
    if (user.imageProfile) {
        const nombreArr = user.imageProfile.split('/');
        const nombre = nombreArr.slice(-2).join('/');
        const [ public_id] = nombre.split('.');
        cloudinary.v2.uploader.destroy(public_id);
    }

    let message,uploaded,imgUrl;
    const {tempFilePath} = req.files.profileImage;
    const {secure_url} = await cloudinary.v2.uploader.upload(tempFilePath, {
        folder:'profileImage', 
        responsive_breakpoints: { 
            create_derived: true, bytes_step: 20000, max_width: 150, 
            transformation: { crop: 'fill', aspect_ratio: '16:9', gravity: 'auto' } 
        } 
    });

    user.imageProfile = secure_url;

    await user.save();

    if (secure_url) {
        message = 'Imagen subida';
        imgUrl = secure_url;
        uploaded = true;
    } else {
        message = 'No se pudo subir la imagen';
        uploaded = false;
    }

    res.status(200).json({
        message,
        uploaded,
        imgUrl
    })
}

const cart = (req, res) => {
    res.render("pages/cart", {
        userLogged: req.user,
        loggedIn: true,
    });
}

export {
    dashboard,
    profile,
    userUpdate,
    cart,
    userImageUpload
}

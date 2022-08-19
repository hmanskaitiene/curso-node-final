import MensajeService  from '../services/mensajes.js';
const mensajeService = new MensajeService();

const createMensaje = async(req, res) => {
    const mensaje = req.body;
    const response = await mensajeService.createMensaje(mensaje);

    const io = await req.app.get("io");    
    io.to(mensaje.email).emit("new-message", response.data);
    
    res.status(response.status).json(response.data)
}

const getMensajesByEmail = async(req, res) => {
    const email = req.params.email;
    const response = await mensajeService.getMensajesByEmail(email);
    res.status(response.status).json(response.data)
}

const getMensajesSenders = async(req, res) => {
    const response = await mensajeService.getMensajesSenders();
    res.status(response.status).json(response.data)
}

export default {
    createMensaje,
    getMensajesByEmail,
    getMensajesSenders,
}
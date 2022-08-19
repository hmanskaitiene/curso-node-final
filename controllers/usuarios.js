import UserService  from '../services/usuarios.js';
const userService = new UserService();

const login = async (req, res) => {
    const {email,passwd} = req.body;
    const response = await userService.login(email, passwd);
    res.status(response.status).json(response.data)
}

const signup = async (req, res) => {
    const response = await userService.signup(req.body);
    res.status(response.status).json(response.data)
}

const userUpdate = async (req, res) => {
    const id = req.params.id;
    const user = req.body
    const response = await userService.userUpdate(id,user);
    res.status(response.status).json(response.data)
}

const userImage = async (req, res) => {
    const id = req.params.id;
    const {tempFilePath} = req.files.profileImage;
    const response = await userService.userImage(id,tempFilePath);
    res.status(response.status).json(response.data)
}

export default {
    login,
    signup,
    userImage,
    userUpdate,
}

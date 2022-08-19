const login = (req, res) => {
    res.render("pages/login", { loggedIn: false });
}

const signup = (req, res) => {
    res.render("pages/signup", { loggedIn: false });
}

const logout = (req, res) => {
    res.render("pages/logout", { loggedIn: false });
}

const dashboard = (req, res) => {
    res.render("pages/dashboard", { loggedIn: true });
}

const profile = (req, res) => {
    res.render("pages/profile", { loggedIn: true });
}

const cart = (req, res) => {
    res.render("pages/cart", { loggedIn: true });
}

const orders = (req, res) => {
    res.render("pages/orders", { loggedIn: true });
}

const producto = (req, res) => {
    res.render("pages/producto", { loggedIn: true });
}

const chat = (req, res) => {
    res.render("pages/chat", { loggedIn: true });
}

const chats = (req, res) => {
    res.render("pages/chats", { loggedIn: true });
}

const stock = (req, res) => {
    res.render("pages/stock", { loggedIn: true });
}

const categoria = (req, res) => {
    res.render("pages/categoria", { loggedIn: true });
}

const info = (req, res) => {
    res.render("pages/info", { loggedIn: true });
}

export default {
    login,
    signup,
    logout,
    dashboard,
    profile,
    cart,
    orders,
    producto,
    chat,
    chats,
    stock,
    categoria,
    info,
}

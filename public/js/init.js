//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
});


const generarMenu = async () => {
    const response = await fetch('/templates/menu.hbs')
    const plantilla = await response.text();
    const template = Handlebars.compile(plantilla);
    const userLogged = JSON.parse(sessionStorage.getItem('userInfo'))
    const html = template( {userLogged} )
    document.getElementById('menu').innerHTML = html

}
//generarMenu();
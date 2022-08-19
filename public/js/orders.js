
//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
    await generarMenu();
    const ordenes = await generarOrdenes();
    generarViewOrdenes(ordenes);
}

const generarOrdenes = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const response = await apiQuery(`/api/ordenes/email/${userInfo.email}`);
    const orders = await response.json();

    return orders;
}


const generarViewOrdenes = (orders) => {
    fetch('/templates/ordenes.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ orders })
        document.getElementById('orderList').innerHTML = html
    })
}

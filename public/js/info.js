
//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
    await generarMenu();
    const info = await obtenerInformacion();
    generarViewInformacion(info);
}

const obtenerInformacion = async () => {
    const response = await apiQuery(`/api/informacion`);
    const info = await response.json();

    return info;
}


const generarViewInformacion = (info) => {
    fetch('/templates/info.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ info })
        document.getElementById('information').innerHTML = html
    })
}



document.addEventListener("DOMContentLoaded", async () => {
    generarMenu();
    const senders = await getMensajesSenders();
    generarViewSender(senders);
});

const getMensajesSenders = async () => {
    const response = await apiQuery(`/api/mensajes/senders`);
    const senders = await response.json();

    return senders;
}


const generarViewSender = (items) => {
    fetch('/templates/chats.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ items })
        document.getElementById('senderList').innerHTML = html;
    })
}
/*
document.getElementById('btnMensajeEnviar').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = window.location.href.split("/").pop();    
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('mensaje').value)) {
        showError('mensaje', 'Este es un campo requerido');
        form_validation = false;
    }
    const tipo = email === sessionStorage.getItem('userEmail') ? 'USER' : 'SYSTEM';

    if (form_validation){
        const mensaje = {
            email,
            tipo,
            mensaje: document.getElementById('mensaje').value
        }

        document.getElementById('form_mensaje').reset();
        document.getElementById('mensaje').focus();

        const response = await apiQuery(`/api/mensajes`,'POST', mensaje);
        const message = await response.json();
    }
});

socket.on('new-message', mensaje => generarVistaMsg(mensaje));

const generarVistaMsg = (msg) => {
    fetch('/templates/message.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ msg })
        const parent = document.querySelector('#messagesList');
        parent.querySelector('.container').innerHTML += html
    })
}
*/
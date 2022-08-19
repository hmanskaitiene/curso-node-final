const socket = io.connect();

document.addEventListener("DOMContentLoaded", async () => {
    await generarMenu();
    const email = window.location.href.split("/").pop();
    const messages = await getMessagesByEmail(email);
    generarViewChat(messages,email);
    socket.emit('create-room', email);
});

const getMessagesByEmail = async (email) => {
    const response = await apiQuery(`/api/mensajes/${email}`);
    const messages = await response.json();

    return messages;
}

const generarViewChat = (items,email) => {
    fetch('/templates/chat.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ items , email })
        document.getElementById('messagesList').innerHTML = html
        document.getElementById('messages').scrollIntoView({block: "end"});
    })
}


document.querySelector('#mensaje').addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#btnMensajeEnviar').click();
    }
});

document.getElementById('btnMensajeEnviar').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = window.location.href.split("/").pop();    
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('mensaje').value)) {
        showError('mensaje', 'Este es un campo requerido');
        form_validation = false;
    }
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    
    const tipo = email === userInfo.email ? 'USER' : 'SYSTEM';

    if (form_validation){
        const mensaje = {
            email,
            tipo,
            mensaje: document.getElementById('mensaje').value
        }

        document.getElementById('form_mensaje').reset();
        document.getElementById('mensaje').focus();

        
        socket.emit('create-room', email);

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
        if (document.querySelector('.alert-info') !== null) {
            parent.querySelector('.container').innerHTML = html
        } else {
            parent.querySelector('.container').innerHTML += html
        }
        document.getElementById('messages').scrollIntoView({block: "end"});
    })
}

const socketInit = async (socket) => {
    socket.on('create-room', (name) => socket.join(name) );
}

export default socketInit;

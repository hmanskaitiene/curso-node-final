
const generarCarrito = async () => {
    let cartId = localStorage.getItem('cartId');

    if (cartId === null) {
        const response = await fetch("/api/carrito",{method: "POST"});
        const {id} = await response.json();
        localStorage.setItem('cartId',id)
        cartId = id;
    }

    const response = await fetch(`/api/carrito/${cartId}/productos`);
    const products = await response.json();
    return products;
}

const agregarProducto = (button, id, rebuildView = false) => {
    const cartId = localStorage.getItem('cartId');

    button.innerHTML = buttonAddContentLoading;
    button.disabled = true;
    fetch(`/api/carrito/${cartId}/productos`, {
        method: "POST",
        body: JSON.stringify([{id}]),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then((cart)=> {
        return fetch(`/api/carrito/${cartId}/productos`);  
    })
    .then(response => response.json())
    .then((productosCarrito) => {
        button.innerHTML = buttonAddContentComplete;
        button.disabled = false;
        document.querySelector('#badgeCantProductos').innerHTML = productosCarrito.length;
        if (rebuildView) generarViewCarrito(productosCarrito);
        renderToasty('success', 'Se ha agregado el producto al carrito','top','left');
    })
}

const eliminarProducto = (button, id) => {
    const cartId = localStorage.getItem('cartId');

    button.disabled = true;
    button.innerHTML = buttonDeleteContentLoading;
    fetch(`/api/carrito/${cartId}/productos/${id}`, {method: "DELETE"})
    .then(response => response.json())
    .then((cart)=> {
        return fetch(`/api/carrito/${cartId}/productos`);  
    })
    .then(response => response.json())
    .then((productosCarrito) => {
        button.innerHTML = buttonDeleteContentComplete;
        button.disabled = false;
        generarViewCarrito(productosCarrito);
        renderToasty('success', 'Se ha eliminado el producto');
    })
}

const finalizarCompra =  (button) => {
    const cartId = localStorage.getItem('cartId');
    const userId = sessionStorage.getItem('userId');
    // Por el momento se borra el carrito....no se si sera asi
    button.innerHTML = buttonOrderContentLoading
    button.disabled = true;
    fetch(`/api/carrito/${cartId}/usuario/${userId}`, {method: "PUT"})
    .then(response => response.json())
    .then(()=> {
        return fetch(`/api/carrito/${cartId}`, {method: "DELETE"})
    })
    .then(response => response.json())
    .then(()=> {
        localStorage.removeItem('cartId');
        button.innerHTML = buttonOrderContentComplete;
        return Swal.fire(
            'Compra realizada',
            'Su pedido ha sido registrado con éxito.',
            'success'
        )
    })
    .then(() => {
        location.replace('/dashboard')
    });

}
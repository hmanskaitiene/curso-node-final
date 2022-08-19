
const generarCarrito = async () => {
    
    let { email } = JSON.parse(sessionStorage.getItem('userInfo'));
    let cartId = sessionStorage.getItem('cartId');

    if (cartId === null) {
        const response = await apiQuery(`/api/carrito/email/${email}`)
        const { id } = await response.json();
        sessionStorage.setItem('cartId',id)
        cartId = id;
    }
    const response = await apiQuery(`/api/carrito/${cartId}/productos`)
    const products = await response.json();
    return products;
}

const agregarProducto = async (button, id, rebuildView = false) => {
    let cartId = sessionStorage.getItem('cartId');

    button.innerHTML = buttonAddContentLoading;
    button.disabled = true;
    const response = await apiQuery(`/api/carrito/${cartId}/productos`,'POST',[{id}]);
    const productosCarrito = await response.json();

    button.innerHTML = buttonAddContentComplete;
    button.disabled = false;

    document.querySelector('#badgeCantProductos').innerHTML = productosCarrito.length;
    if (rebuildView) generarViewCarrito(productosCarrito);
    renderToasty('success', 'Se ha agregado el producto al carrito','top','left');
}

const eliminarProducto = async (button, id) => {
    let cartId = sessionStorage.getItem('cartId');

    button.disabled = true;
    button.innerHTML = buttonDeleteContentLoading;
    const response = await apiQuery(`/api/carrito/${cartId}/productos/${id}`,'DELETE');
    const productosCarrito = await response.json();

    button.innerHTML = buttonDeleteContentComplete;
    button.disabled = false;
    generarViewCarrito(productosCarrito);
    renderToasty('success', 'Se ha eliminado el producto');
}

const finalizarCompra = async (button) => {
    let cartId = sessionStorage.getItem('cartId');
    
    button.innerHTML = buttonOrderContentLoading
    button.disabled = true;

    const response = await apiQuery(`/api/ordenes/${cartId}`,'POST');
    const orderInfo = await response.json();

    sessionStorage.removeItem('cartId');
    button.innerHTML = buttonOrderContentComplete;
    Swal.fire({
        title: 'Compra realizada',
        text: 'Su pedido ha sido registrado con éxito.',
        icon: 'success'
    })
    .then((result) => {
        if (result.isConfirmed) {
            location.replace('/productos')
        }
    })


}
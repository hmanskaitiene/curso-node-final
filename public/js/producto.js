const buttonAddContentComplete = `Agregar al carrito`;
const buttonAddContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonAddContentComplete}`;

//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
  await generarMenu();
  const productId = window.location.href.split("/").pop();
  const producto = await getProductoInfo(productId);
  generarViewProducto(producto);
  const productosCarrito = await generarCarrito();
  document.querySelector('#badgeCantProductos').innerHTML = productosCarrito.length;
}

const getProductoInfo = async (id) => {
  const response = await apiQuery(`/api/productos/${id}`);
  const product = await response.json();
  return product;
}

const generarViewProducto = (producto) => {
    fetch('/templates/producto.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template( producto)
        document.getElementById('productoList').innerHTML = html

        const button = document.querySelector('.add-button');
        button.addEventListener('click', (e)=> {
          agregarProducto(e.target,e.target.getAttribute("data-id"));
        });
    })
}

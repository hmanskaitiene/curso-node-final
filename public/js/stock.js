const buttonUpdateContentComplete = `Modificar`;
const buttonUpdateContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonUpdateContentComplete}`;
const buttonDeleteContentComplete = `Eliminar`;
const buttonDeleteContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonDeleteContentComplete}`;
const buttonAddContentComplete = `Crear`;
const buttonAddContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonAddContentComplete}`;

const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
    await generarMenu();
    const productos = await generarStock();
    generarViewStock(productos);
}

const generarStock = async () => {
  const response = await apiQuery(`/api/productos/`);
  const products = await response.json();

  return products;
}

const generarViewStock = (items) => {
    fetch('/templates/stock.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ items})
        document.getElementById('stockList').innerHTML = html

        const updButtons = document.querySelectorAll('.upd-button');

        updButtons.forEach(button => {
          button.addEventListener('click', (e)=> {
            setModificarProducto(e.target.getAttribute("data-id"));
          });
        });
        
        const delButtons = document.querySelectorAll('.remove-button');
        delButtons.forEach(button => {
          button.addEventListener('click', (e)=> {
            Swal.fire({
              title: '¿Desea eliminar el producto?',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Eliminar producto',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                  eliminarProducto(e.target,e.target.getAttribute("data-id"));
              }
          })
          });
        });

    })
}

document.getElementById('btnProductoForm').addEventListener('click',async  (e) => {
  e.preventDefault();
  cleanErrors();
  let form_validation = true;
  
  if (!isRequired(document.getElementById('nombre').value)) {
      showError('nombre', 'Este es un campo requerido');
      form_validation = false;
  }

  if (!isRequired(document.getElementById('codigo').value)) {
      showError('codigo', 'Este es un campo requerido');
      form_validation = false;
  }
  if (!isRequired(document.getElementById('precio').value)) {
      showError('precio', 'Este es un campo requerido');
      form_validation = false;
  }

  if (!isRequired(document.getElementById('categoria').value)) {
      showError('categoria', 'Este es un campo requerido');
      form_validation = false;
  }
  if (!isRequired(document.getElementById('stock').value)) {
      showError('stock', 'Este es un campo requerido');
      form_validation = false;
  }

  if (!isRequired(document.getElementById('foto').value)) {
      showError('foto', 'Este es un campo requerido');
      form_validation = false;
  }
  
  if (!isRequired(document.getElementById('descripcion').value)) {
      showError('descripcion', 'Este es un campo requerido');
      form_validation = false;
  }

  if (form_validation) {
    e.target.disabled = true;
      const producto = {
          nombre: document.getElementById('nombre').value,
          codigo: document.getElementById('codigo').value,
          precio: document.getElementById('precio').value,
          categoria: document.getElementById('categoria').value,
          stock: document.getElementById('stock').value,
          foto: document.getElementById('foto').value,
          descripcion: document.getElementById('descripcion').value
      };

      document.getElementById('formProducto').reset();

      const idUpd = document.getElementById('idProductoUpd').value;
      let urlFetch, method, body, messageForm,buttonText;
    
      if (idUpd == ''){
        urlFetch = '/api/productos';
        method = 'POST';
        body = [producto];
        messageForm = 'Se ha agregado el producto';
        buttonText = buttonAddContentComplete;
        e.target.innerHTML = buttonAddContentLoading;
      } else {
        urlFetch = `/api/productos/${idUpd}`;
        method = 'PUT';
        body = producto;
        messageForm = 'Se ha actualizado el producto';
        document.getElementById('idProductoUpd').value = '';
        document.getElementById('formProductoTitle').innerHTML = 'Nuevo Producto';
        document.getElementById('btnProductoForm').value = 'Crear';
        buttonText = buttonUpdateContentLoading;
        e.target.innerHTML = buttonText;
      }

      const response = await apiQuery(urlFetch,method,body);
      const productos = await response.json();

      loadInitialData()
      renderToasty('success', messageForm);
      e.target.disabled = false;
      e.target.innerHTML = buttonText;
  }
});

document.getElementById('btnCancelarForm').addEventListener('click', () => {
  cleanErrors();
  document.getElementById('formProducto').reset();
  document.getElementById('idProductoUpd').value = '';
  document.getElementById('formProductoTitle').innerHTML = 'Nuevo Producto';
  document.getElementById('btnProductoForm').value = 'Crear';
});

const setModificarProducto = async (id) => {
  location.hash = "#formProductoTitle";
  const response = await apiQuery(`/api/productos/${id}`);
  const producto = await response.json();

  document.getElementById('idProductoUpd').value = id;
  document.getElementById('nombre').value = producto.nombre;
  document.getElementById('codigo').value = producto.codigo;
  document.getElementById('precio').value = producto.precio;
  document.getElementById('categoria').value = producto.categoria;
  document.getElementById('stock').value = producto.stock;
  document.getElementById('foto').value = producto.foto;
  document.getElementById('descripcion').value = producto.descripcion;
  document.getElementById('formProductoTitle').innerHTML = 'Editar Producto';
  document.getElementById('btnProductoForm').value = 'Guardar';
}

const eliminarProducto = async (button, id) => {
  button.disabled = true;
  button.innerHTML = buttonDeleteContentLoading;
  const response = await apiQuery(`/api/productos/${id}`,"DELETE");
  const producto = await response.json();
  button.innerHTML = buttonDeleteContentComplete;
  button.disabled = false;
  loadInitialData();
  renderToasty('success', 'Se ha eliminado el producto');
}
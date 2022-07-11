# Proyecto Final Node

Proyecto ecommerce backend

Para realizar pruebas locales se puede importar este [archivo](./postman_collection.json)  en Postman y ver los endpoints disponibles.

Para empezar a utilizar completar las variables de entorno.

En el caso de SQLite o MariaDB para crear db hay que ejecutar: 
```
npm run build
```

# Endpoints

Productos

- Obtener producto/s `GET /api/productos/:id?` 
- Crear producto/s `POST /api/productos/`
- Actualizar producto `PUT /api/productos/:id`
- Eliminar producto `DELETE /api/productos/:id`

Carrito

- Crear carrito `POST /api/carrito/`
- Eliminar carrito `DELETE /api/carrito/:id`
- Obtener producto/s del carrito `GET /api/carrito/:id/productos` 
- Agregar producto/s al carrito `POST /api/carrito/:id/productos` 
- Eliminar producto del carrito `DELETE /api/carrito/:id/productos/:id_prod` 


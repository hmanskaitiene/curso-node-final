class CarritoDto {
  constructor(carrito) {
    this.id = carrito.id;
    this.email = carrito.email;
    this.direccion = carrito.direccion;
    this.productos = carrito.productos;
    this.timestamp = carrito.timestamp;
  }
}

export default CarritoDto;

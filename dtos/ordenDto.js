class OrdenDto {
  constructor(orden) {
    this.id = orden.id;
    this.email = orden.email;
    this.estado = orden.estado;
    this.timestamp = orden.timestamp;
    this.productos = orden.productos;
    this.total = orden.total;
    this.numero = orden.numero;
  }
}

export default OrdenDto;

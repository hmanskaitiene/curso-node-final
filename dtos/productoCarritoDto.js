class ProductoCarritoDto {
    constructor(product) {
      this.id = product.id;
      this.nombre = product.nombre;
      this.descripcion = product.descripcion;
      this.codigo = product.codigo;      
      this.stock = product.stock;
      this.categoria = product.categoria;
      this.precio = product.precio;
      this.cantidad= product.cantidad || 1;
      this.total= this.cantidad * this.precio;
      this.foto = product.foto;
      this.timestamp = product.timestamp;
  }
}

export default ProductoCarritoDto;

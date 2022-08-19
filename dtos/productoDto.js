class ProductoDto {
    constructor(product) {
      this.id = product.id;
      this.nombre = product.nombre;
      this.descripcion = product.descripcion;
      this.codigo = product.codigo;      
      this.stock = product.stock;
      this.categoria = product.categoria;
      this.precio = product.precio;
      this.foto = product.foto;
      this.timestamp = product.timestamp;
  }
}

export default ProductoDto;

class MensajeDto {
    constructor(message) {
      this.id = message.id;
      this.email = message.email;
      this.mensaje = message.mensaje;
      this.tipo = message.tipo;
      this.fecha = message.createdAt;

  }
}

export default MensajeDto;

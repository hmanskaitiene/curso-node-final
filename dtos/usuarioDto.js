class UsuarioDto {
    constructor(user) {
      this.id = user.id;
      this.nombre = user.nombre;
      this.direccion = user.direccion;
      this.edad = user.edad;      
      this.telefono = user.telefono;
      this.email = user.email;
      this.password = user.password;
      this.imageProfile = user.imageProfile;
      this.rol = user.rol;
  }
}

export default UsuarioDto;

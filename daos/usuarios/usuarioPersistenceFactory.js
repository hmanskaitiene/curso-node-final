import config from '../../config/config.js';

export default class UsuarioPersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
        /*
      case 'ARRAY':
        let { default: CarritosDaoMemoria } = await import('./carritosDaoMemoria.js');
        return new CarritosDaoMemoria();
      case 'FILE':
        let { default: CarritosDaoArchivo } = await import('./carritosDaoArchivo.js');
        return new CarritosDaoArchivo();
        */
      case 'MONGODB':
        let { default: UsuarioDaoMongoDB } = await import('./usuariosDaoMongoDB.js');
        return new UsuarioDaoMongoDB();
    }
  };
}

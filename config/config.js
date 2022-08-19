import dotenv from 'dotenv';
import argv from'./yargs.js';
dotenv.config();

export default {
  app: {
    persistence: argv.persistence ? argv.persistence : process.env.PERSISTENCE ? process.env.PERSISTENCE : 'MONGODB',
    port: process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080,
    modo: process.env.MODO || 'fork',
    smtpHost: process.env.SMTP_HOST,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneSender: process.env.TWILIO_PHONE_SENDER,
    twilioPhoneSandbox: process.env.TWILIO_PHONE_SANDDOX,
    twilioPhoneWapSender: process.env.TWILIO_PHONE_WAP_SENDER,
    twilioPhoneWapSandbox: process.env.TWILIO_PHONE_WAP_SANDBOX,
    cloudinaryUrl: process.env.CLOUDINARY_URL,
    logLevel: process.env.LOG_LEVEL || 'info',
    googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || null,
    databaseDirectory: process.env.DATABASE_DIRECTORY || 'db',
    sqliteFilename: process.env.SQLITE_FILENAME || 'base.sqlite',
    secretOrPrivateKey: process.env.SECRETORPRIVATEKEY,
    imageProfileCommerce: process.env.IMAGE_PROFILE_COMMERCE,
    filenameProductos: process.env.FILENAME_PRODUCTOS || 'productos.json',
    filenameCarritos: process.env.FILENAME_CARRITOS || 'carritos.json',
    filenameUsuarios: process.env.FILENAME_USUARIOS || 'usuarios.json',
    filenameMensajes: process.env.FILENAME_MENSAJES || 'mensajes.json',
    mongoCnn: process.env.MONGODB_CNN || 'mongodb://localhost:27017/ecommerce',
    mariadbHost: process.env.MARIADB_HOST || '127.0.0.1',
    mariadbUser: process.env.MARIADB_USER || 'root',
    mariadbPassword: process.env.MARIADB_PASSWORD || '',
    mariadbDatabase: process.env.MARIADB_DATABASE || 'ecommerce',
  }
};

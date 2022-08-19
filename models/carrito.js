import mongoose from 'mongoose'
import Producto from './producto.js';

const CarritoSchema = new mongoose.Schema({
    timestamp:{
        type: Number,
        required: false,
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    direccion:{
        type: String,
        required: [true, 'La dirección de entrega es obligatoria'],
    },
    productos : []
}, { timestamps: true, versionKey: false });

CarritoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }
export default mongoose.model('Carrito',CarritoSchema);

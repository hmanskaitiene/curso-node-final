import mongoose from 'mongoose'

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion:{
        type: String,
        required: false,
    },
    codigo:{
        type: String,
        required: [true, 'El codigo es obligatorio'],
    },
    foto:{
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    stock:{
        type: Number,
        required: [true, 'El stock es obligatorio'],
    },
    timestamp:{
      type: Number,
      required: true,
    },
    categoria:{
        type: String,
        required: [true, 'La categoria es obligatoria'],
    },
}, { timestamps: true, versionKey: false });

ProductoSchema.methods.toJSON = function(){
  const {_id,...data} = this.toObject();
  data.id = _id;
  return data;
}

export default mongoose.model('Producto',ProductoSchema);

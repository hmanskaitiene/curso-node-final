import mongoose from 'mongoose'

const OrdenSchema = new mongoose.Schema({
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
    estado:{
        type: String,
        default: 'generada'
    },
    numero:{
        type: Number,
        required: false,
    },
    productos : []
}, { timestamps: true, versionKey: false });

// Función que calcula el numero de orden en base a la cantidad de documentos.
OrdenSchema.pre('save', function(next) {
    let doc = this
    if (this.isNew) {
      doc.constructor.count(function(err, cantidad) {
        if(err){
           return next(err);
        }
        doc.numero = cantidad + 1
        return next();
      });
  } else {
      next();
  }
});

OrdenSchema.methods.toJSON = function(){
    const {_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }


export default mongoose.model('Orden',OrdenSchema);
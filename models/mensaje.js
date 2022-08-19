import mongoose from 'mongoose'

const MensajeSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    tipo:{
        type: String,
        required: true,
        enum: ['USER', 'SYSTEM'],
        default: 'USER',
    },
    mensaje:{
        type: String,
        required: [true, 'El mensaje es obligatorio'],
    }
}, { timestamps: true, versionKey: false });

MensajeSchema.methods.toJSON = function(){
  const {_id,...data} = this.toObject();
  data.id = _id;
  return data;
}

export default mongoose.model('Mensaje',MensajeSchema);

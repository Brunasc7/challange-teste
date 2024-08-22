import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: true
  },
  emails: {
    type: [String],
    required: true
  },
  telefones: {
    type: [String],
    required: true
  },
  dataRegistro: {
    type: Date,
    default: Date.now,
    required: true
  },
  contatos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contato'
  }]
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
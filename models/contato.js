import mongoose from 'mongoose';

const contatoSchema = new mongoose.Schema({
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
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  }
});

const Contato = mongoose.model('Contato', contatoSchema);
export default Contato;
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import clienteRoutes from './routes/clientRoutes.js';
import contatoRoutes from './routes/contatoRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexão com o MongoDB
const dbURI = 'mongodb://localhost:27017/challange-test';
mongoose.connect(dbURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Usar as rotas
app.use('/clientes', clienteRoutes);
app.use('/contatos', contatoRoutes);

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

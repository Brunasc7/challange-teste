import express from 'express';
import Cliente from '../models/cliente.js';

const router = express.Router();

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    try {
        const novoCliente = new Cliente(req.body);
        const clienteSalvo = await novoCliente.save();
        res.status(201).json(clienteSalvo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para listar um cliente específico pelo ID
router.get('/:id', async (req, res) => {
  // Código para listar um cliente específico
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

// Rota para atualizar um cliente específico pelo ID
router.put('/:id', async (req, res) => {
  // Código para atualizar um cliente
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clienteAtualizado) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para deletar um cliente específico pelo ID
router.delete('/:id', async (req, res) => {
  // Código para deletar um cliente
  try {
    const clienteDeletado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteDeletado) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

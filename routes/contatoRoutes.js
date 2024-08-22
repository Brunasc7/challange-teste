import express from 'express';
import Contato from '../models/contato.js';
import Cliente from '../models/cliente.js';

const router = express.Router();

// Rota para criar um novo contato e associá-lo a um cliente (CREATE)
router.post('/', async (req, res) => {
  try {
    const { nomeCompleto, emails, telefones, clienteId } = req.body;

    // Verifica se o clienteId foi fornecido
    if (!clienteId) {
      return res.status(400).json({ error: 'O campo clienteId é obrigatório' });
    }

    // Busca o cliente pelo ID
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Cria um novo contato associado ao cliente
    const novoContato = new Contato({
      nomeCompleto,
      emails,
      telefones,
      cliente: cliente._id
    });
    const contatoSalvo = await novoContato.save();

    // Adiciona o contato ao array de contatos do cliente
    cliente.contatos.push(contatoSalvo._id);
    await cliente.save();

    res.status(201).json(contatoSalvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para listar todos os contatos (READ)
router.get('/', async (req, res) => {
  try {
    const contatos = await Contato.find().populate('cliente', 'nomeCompleto');
    res.json(contatos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar um contato específico pelo ID (READ)
router.get('/:id', async (req, res) => {
  try {
    const contato = await Contato.findById(req.params.id).populate('cliente', 'nomeCompleto');
    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    res.json(contato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um contato específico pelo ID (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const { nomeCompleto, emails, telefones, clienteId } = req.body;
    const contatoAtualizado = await Contato.findByIdAndUpdate(
      req.params.id,
      { nomeCompleto, emails, telefones, cliente: clienteId },
      { new: true }
    ).populate('cliente', 'nomeCompleto');

    if (!contatoAtualizado) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }

    res.json(contatoAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para deletar um contato específico pelo ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const contatoDeletado = await Contato.findByIdAndDelete(req.params.id);

    if (!contatoDeletado) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }

    // Remover o contato do array de contatos do cliente
    const cliente = await Cliente.findById(contatoDeletado.cliente);
    if (cliente) {
      cliente.contatos.pull(contatoDeletado._id);
      await cliente.save();
    }

    res.json({ message: 'Contato deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

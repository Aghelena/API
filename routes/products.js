const express = require('express');
const Product = require('../models/Product'); // Model de Produto
const router = express.Router();

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Encontrar todos os produtos no MongoDB
    res.json(products);  // Retornar os produtos no formato JSON
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).json({ message: err.message });
  }
});

// Listar um produto específico por ID ou Nome
router.get('/:param', async (req, res) => {
  try {
    const param = req.params.param;  // ID ou Nome do produto
    const product = await Product.findOne({
      $or: [{ _id: param }, { nome: param }]  // Buscar por ID ou Nome
    });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ message: err.message });
  }
});

// Cadastrar um novo produto
router.post('/', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;  // Dados do produto

  const newProduct = new Product({ nome, descricao, cor, peso, tipo, preco });

  try {
    const savedProduct = await newProduct.save();  // Salvar no banco de dados
    res.status(201).json(savedProduct);  // Retornar o produto criado
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(400).json({ message: err.message });
  }
});

// Atualizar um produto existente
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Encontrar o produto pelo ID
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Atualizando os campos do produto
    product.nome = req.body.nome || product.nome;
    product.descricao = req.body.descricao || product.descricao;
    product.cor = req.body.cor || product.cor;
    product.peso = req.body.peso || product.peso;
    product.tipo = req.body.tipo || product.tipo;
    product.preco = req.body.preco || product.preco;

    const updatedProduct = await product.save();  // Salvar as mudanças
    res.json(updatedProduct);  // Retornar o produto atualizado
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(400).json({ message: err.message });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Encontrar o produto pelo ID
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.remove();  // Remover o produto do banco de dados
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

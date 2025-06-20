const express = require('express');
const Product = require('../models/Product'); // Model de Produto
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: "Listar todos os produtos"
 *     description: "Retorna todos os produtos cadastrados na loja."
 *     responses:
 *       200:
 *         description: "Lista de produtos"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Encontrar todos os produtos no MongoDB
    res.json(products);  // Retornar os produtos no formato JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: "Listar produto por ID ou Nome"
 *     description: "Retorna um produto específico com base no ID ou nome fornecido."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID ou nome do produto"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Produto encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: "Produto não encontrado"
 */
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
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: "Criar um novo produto"
 *     description: "Cria um novo produto no banco de dados."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: "Produto criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;  // Dados do produto
  const newProduct = new Product({ nome, descricao, cor, peso, tipo, preco });

  try {
    const savedProduct = await newProduct.save();  // Salvar no banco de dados
    res.status(201).json(savedProduct);  // Retornar o produto criado
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: "Atualizar um produto existente"
 *     description: "Atualiza os detalhes de um produto existente com base no ID fornecido."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID do produto a ser atualizado"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: "Produto atualizado com sucesso"
 *       404:
 *         description: "Produto não encontrado"
 */
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: "Deletar um produto"
 *     description: "Deleta o produto com o ID fornecido."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID do produto a ser deletado"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Produto deletado com sucesso"
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.remove();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - cor
 *         - peso
 *         - tipo
 *         - preco
 *       properties:
 *         _id:
 *           type: string
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         cor:
 *           type: string
 *         peso:
 *           type: number
 *         tipo:
 *           type: string
 *         preco:
 *           type: number
 *         dataCadastro:
 *           type: string
 *           format: date-time
 */

module.exports = router;

const mongoose = require('mongoose');

// Definindo o esquema do produto
const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  cor: { type: String, required: true },
  peso: { type: Number, required: true },
  tipo: { type: String, required: true },
  preco: { type: Number, required: true },
  dataCadastro: { type: Date, default: Date.now }  // Data de cadastro automática
});

// Criando o modelo com base no esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

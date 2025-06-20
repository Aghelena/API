// Importando dependências
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o CORS

// Criando o app
const app = express();

// Usando o CORS para permitir todas as origens (cross-origin requests)
app.use(cors());  // Configuração para permitir todas as origens

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro de conexão com o MongoDB:', err));

// Middleware para analisar corpo das requisições
app.use(bodyParser.json());

// Importando e configurando as rotas para produtos
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
app.get("/", () => console.log("teste"))

// Rodando o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

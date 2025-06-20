// Importando dependências
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');  // Importando o Swagger UI
const swaggerJsdoc = require('swagger-jsdoc');    // Importando o Swagger JSDoc

// Criando o app
const app = express();

// Usando o CORS para permitir todas as origens
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro de conexão com o MongoDB:', err));

// Middleware para analisar corpo das requisições
app.use(bodyParser.json());

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0",  // Versão do OpenAPI
    info: {
      title: "API de Produtos - Loja de Departamentos",  // Título da API
      version: "1.0.0",  // Versão da API
      description: "API para gerenciar produtos em uma loja de departamentos",  // Descrição da API
    },
  },
  // Caminho para os arquivos que contêm as anotações dos endpoints
  apis: ["./routes/products.js"],
};

// Inicializando o Swagger
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Definindo a rota /api-docs para visualizar a documentação

// Importando e configurando as rotas para produtos
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Rodando o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

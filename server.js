// Importando dependências
require('dotenv').config();  // Carregar variáveis de ambiente do arquivo .env
const express = require('express');  // Framework Express
const mongoose = require('mongoose');  // Conexão com MongoDB
const bodyParser = require('body-parser');  // Middleware para análise de corpo
const cors = require('cors');  // Middleware para CORS
const swaggerUi = require('swagger-ui-express');  // Swagger UI para interface
const swaggerJsdoc = require('swagger-jsdoc');    // Swagger JSDoc para documentação

// Criando o app Express
const app = express();

// Usando middleware
app.use(cors());  // Permitir solicitações de diferentes origens
app.use(bodyParser.json());  // Analisar o corpo das requisições como JSON

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro de conexão com o MongoDB:', err));

// Definindo as opções para o Swagger JSDoc
const options = {
  definition: {
    openapi: "3.0.0",  // Versão da especificação OpenAPI
    info: {
      title: "API de Produtos - Loja de Departamentos",  // Título da API
      version: "1.0.0",  // Versão da API
      description: "API para gerenciar produtos em uma loja de departamentos",  // Descrição da API
    },
  },
  apis: ["./routes/products.js"],  // Caminho dos arquivos de rotas que contêm as anotações Swagger
};

// Gerando a especificação Swagger a partir das opções
const swaggerSpec = swaggerJsdoc(options);

// Rota para acessar a documentação Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importando e configurando as rotas de produtos
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);  // Prefixo /api/products para as rotas de produtos

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

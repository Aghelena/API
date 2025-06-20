# API de Produtos - Loja de Departamentos

Esta é uma API para gerenciar produtos em uma loja de departamentos, permitindo realizar operações de **CRUD** (Criar, Ler, Atualizar, Deletar) em produtos. A API está construída com **Node.js**, **Express** e **MongoDB**.

## Documentação Swagger 
https://produtos-api-gwde.onrender.com/api-docs/

## Funcionalidades

- **Listar todos os produtos**
- **Buscar produto por ID ou Nome**
- **Cadastrar novo produto**
- **Atualizar produto existente**
- **Deletar produto**

## Tecnologias

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para construção de APIs REST.
- **MongoDB**: Banco de dados NoSQL para armazenar os produtos.
- **Mongoose**: Biblioteca para modelar dados e interagir com o MongoDB.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Instalação

### 1. Clonando o repositório

Clone este repositório para sua máquina local:

```bash
git clone
```

2. Instalando as dependências
Navegue até o diretório do projeto e instale as dependências necessárias:

```bash
cd loja-departamentos-api
npm install
```

3. Configuração das variáveis de ambiente
Crie um arquivo .env na raiz do projeto e configure sua string de conexão do MongoDB. Exemplo:

```bash
MONGODB_URI=mongodb+srv://agnyhhelena9:BfCTVZdFXpzW2NI8@cluster0.isb1pq1.mongodb.net/
```

4. Rodando o servidor
Execute o seguinte comando para rodar a API localmente:

```bash
node server.js
O servidor estará rodando na porta 5001.
```

Endpoints
1. Listar todos os produtos
Método: GET

URL: /api/products

Resposta (exemplo):

```bash
json
[
  {
    "_id": "60d6c1d2f62a4c1ba62c8bc9",
    "nome": "Produto 1",
    "descricao": "Descrição do Produto 1",
    "cor": "Azul",
    "peso": 1.5,
    "tipo": "Eletrônico",
    "preco": 199.99,
    "dataCadastro": "2025-06-19T00:00:00.000Z"
  }
]
```

2. Listar produto por ID ou Nome
Método: GET

URL: /api/products/:param

Onde :param pode ser o ID ou o Nome do produto.

Resposta (exemplo):

```bash
json
{
  "_id": "60d6c1d2f62a4c1ba62c8bc9",
  "nome": "Produto 1",
  "descricao": "Descrição do Produto 1",
  "cor": "Azul",
  "peso": 1.5,
  "tipo": "Eletrônico",
  "preco": 199.99,
  "dataCadastro": "2025-06-19T00:00:00.000Z"
}
```

3. Cadastrar um novo produto
Método: POST

URL: /api/products

Corpo: JSON com os dados do produto.

Exemplo de corpo:

```bash
json
{
  "nome": "Produto Teste",
  "descricao": "Descrição do produto",
  "cor": "Vermelho",
  "peso": 1.0,
  "tipo": "Eletrônico",
  "preco": 99.99
}
```

Resposta (exemplo):
```bash
json
{
  "_id": "60d6c1d2f62a4c1ba62c8bc9",
  "nome": "Produto Teste",
  "descricao": "Descrição do produto",
  "cor": "Vermelho",
  "peso": 1.0,
  "tipo": "Eletrônico",
  "preco": 99.99,
  "dataCadastro": "2025-06-19T00:00:00.000Z"
}
```

4. Atualizar produto existente
Método: PUT

URL: /api/products/:id

Onde :id é o ID do produto que será atualizado.

Exemplo de corpo:

```bash
json
{
  "preco": 149.99
}
```

Resposta (exemplo):
```bash
json
{
  "_id": "60d6c1d2f62a4c1ba62c8bc9",
  "nome": "Produto Teste",
  "descricao": "Descrição do produto",
  "cor": "Vermelho",
  "peso": 1.0,
  "tipo": "Eletrônico",
  "preco": 149.99,
  "dataCadastro": "2025-06-19T00:00:00.000Z"
}
```

5. Deletar produto
Método: DELETE

URL: /api/products/:id

Onde :id é o ID do produto que será deletado.

Resposta (exemplo):
```bash
json
{
  "message": "Produto removido com sucesso"
}
```
![Descrição da Imagem](swagger.jpeg)


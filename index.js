// c:\Users\grautecnico\Banco\Back\index.js
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const postRoutes = require('./models/Post');
const cors = require('cors');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// Middleware para logar as requisições (opcional, mas útil para debug)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Rotas
app.use('/api/posts', postRoutes);

// Conectar ao MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexão com MongoDB bem-sucedida!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
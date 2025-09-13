const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: String,
  comentario: String,
  data: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  titulo: String,
  conteudo: String,
  autor: String,
  data_criacao: { type: Date, default: Date.now },
  comentarios: [comentarioSchema]
});

module.exports = mongoose.model('Post', postSchema);
const express = require('express');
const Post = require('../models/Post'); // This path is correct after deleting the duplicate model.
const mongoose = require('mongoose');

const router = express.Router();

// Rota para buscar todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ data_criacao: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo post
router.post('/', async (req, res) => {
  const { titulo, conteudo, autor } = req.body;

  try {
    const post = await Post.create({ titulo, conteudo, autor });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para buscar um único post pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }

  res.status(200).json(post);
});

// Rota para atualizar um post
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  res.status(200).json(post);
});

// Rota para adicionar um comentário a um post
router.post('/:id/comentarios', async (req, res) => {
  const { id } = req.params;
  const { autor, conteudo } = req.body;

  // Verifica se o ID é um ObjectId válido do MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Adiciona o novo comentário ao array de comentários do post
    post.comentarios.push({ autor, conteudo });
    await post.save(); // Salva o post atualizado

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

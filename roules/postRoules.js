const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET - Listar todos os posts
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// POST - Criar novo post
router.post('/', async (req, res) => {
  const novoPost = new Post(req.body);
  await novoPost.save();
  res.status(201).json(novoPost);
});

// PUT - Atualizar post por ID
router.put('/:id', async (req, res) => {
  const atualizado = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

// DELETE - Apagar post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
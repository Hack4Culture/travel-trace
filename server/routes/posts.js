import express from 'express';
import authWare from './middleware/authWare';
import Validators from '../utils/validators';

const Post = require('../models').Post;

const router = express.Router();

/* 
  Controller Definition for Post Route
*/
router.post('/', authWare, (req, res) => {
  const { isValid, errors } = Validators.newPost(req.body);
  if (!isValid) {
    return res.status(400).send({
      message: 'Registration failed!',
      errors
    })
  }
  const userdata = req.userdata;
  const userId = userdata.id;
  const title = req.body.title;
  const tags = req.body.tags;
  const location = req.body.location;
  const excerpt = req.body.excerpt;
  const content = req.body.content;
  const images = req.body.images;

  Post.create({
    userId,
    title,
    tags,
    location,
    excerpt,
    content,
    images
  }).then((story) => {
    res.status(200).send({
      message: 'Story added successfully',
      story
    })
  }).catch((e) => {
    res.status(500).send({
      message: 'Internal server error',
      e
    })
  })
});

export default router;

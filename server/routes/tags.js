import express from 'express';
import authWare from './middleware/authWare';

const Tag = require('../models').Tag;

const router = express.Router();

router.post('/', authWare, (req, res) => {
  const title = req.body.title;

  Tag.create({
    title
  }).then((tag) => {
    res.status(200).send({
      message: 'Tag added successfully',
      tag
    })
  }).catch((e) => {
    res.status(500).send({
      message: 'Internal server error',
      e
    })
  })
});

export default router;

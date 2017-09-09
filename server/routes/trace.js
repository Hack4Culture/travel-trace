import express from 'express';
import authWare from './middleware/authWare';

const Trace = require('../models').Trace;

const router = express.Router();

router.post('/', authWare, (req, res) => {
  const userdata = req.userdata;
  const userId = userdata.id;
  const name = req.body.name;
  const location = req.body.location;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  Trace.create({
    userId,
    name,
    location,
    imageUrl,
    description
  }).then((trace) => {
    res.status(200).send({
      message: 'Story added successfully',
      trace
    })
  }).catch((e) => {
    res.status(500).send({
      message: 'Internal server error',
      e
    })
  })
});

export default router;

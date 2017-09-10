import express from 'express';
import authWare from './middleware/authWare';
import Validators from '../utils/validators';

const Trace = require('../models').Trace;

const router = express.Router();

router.post('/', authWare, (req, res) => {
  const { isValid, errors } = Validators.newTrace(req.body);
  if (!isValid) {
    return res.status(400).send({
      message: 'Unable to create a new trace!',
      errors
    });
  }
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
    });
  }).catch((e) => {
    res.status(500).send({
      message: 'Internal server error',
      e
    });
  });
});

router.get('/', authWare, (req, res) => {
  Trace.findAll()
  .then((traces) => {
    if (traces.length > 0) {
      return res.status(200).send({
        message: 'Success',
        traces
      });
    }

    return res.status(200).send({
      message: 'No traces yet!',
      traces: []
    });
  })
  .catch();
});

export default router;

import express from 'express';
import GoogleAuth from 'google-auth-library';
// import bcrypt from 'bcrypt-nodejs';

const User = require('../models').User;

const router = express.Router();

router.post('/', (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const avatar = req.body.avatar;

  if (fullname === '' || email === '' || avatar === '') {
    return res.status(400).send({
      errors: {
        fullname: 'fullname is required',
        email: 'email is required',
        avatar: 'avatar is required'
      }
    });
  }

  User.findOne({
    where: {
      email
    }
  }).then((user) => {
    if (user) {
      return res.status(200).send({
        message: 'User already registered',
        user
      });
    }
    User.create({
      fullname,
      email,
      avatar
    })
    .then((newUser) => {
      return res.status(200).send({
        message: 'New user created',
        user: newUser
      })
    })
    .catch(e => res.status(500).send({ message: 'Internal Server error', e }))
  })
  .catch(e => res.status(500).send({ message: 'Internal Server error', e }))
});

export default router;


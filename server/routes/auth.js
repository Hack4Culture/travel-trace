import express from 'express';
import axios from 'axios';
// import bcrypt from 'bcrypt-nodejs';

const User = require('../models').User;

const router = express.Router();

/* 
  Controller Definition for Auth Route
*/
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

router.post('/login', (req, res) => {
  const token = req.body.token;
  if (token) {
    axios.post(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    .then((result) => {
      User.findOne({
        where: {
          email: result.data.email
        }
      }).then((user) => {
        if (user) {
          return res.status(200).send({
            user: user.dataValues
          });
        }
        if (/@andela.com\s*$/.test(res.data.email)) {
          User.create({
            fullname: res.data.name,
            avatar: res.data.picture,
            email: res.data.email
          }).then((newUser) => {
            return res.status(200).send({
              user: newUser
            });
          })
        }
      })
    }, () => {
      return res.status(400).send({
        message: 'Authentication failed!',
      })
    })
  }
})

export default router;


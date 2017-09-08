import express from 'express';
import GoogleAuth from 'google-auth-library';
// import bcrypt from 'bcrypt-nodejs';

const User = require('../models').User;

const router = express.Router();

router.post('/', (req, res) => {
  // const token = req.body.token;
  // const CLIENT_ID = '118794599144-67ac6nnudqsnvr8ssgcd06n9aivpd9cn.apps.googleusercontent.com';
  // const auth = new GoogleAuth;
  // const client = new auth.OAuth2(CLIENT_ID, '', '');
  // client.verifyIdToken(
  //   token,
  //   CLIENT_ID,
  //   // Or, if multiple clients access the backend:
  //   //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
  //   function(e, login) {
  //     if (e) {
  //       return res.status(400).send({
  //         message: 'Authentication failed!',
  //         e
  //       })
  //     }
  //     var payload = login.getPayload();
  //     var userid = payload['sub'];
  //     // If request specified a G Suite domain:
  //     //var domain = payload['hd'];
  //     return res.send({
  //       message: 'Yaw'
  //     })
  //   });
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
        message: 'User already registered'
      });
    }
    User.create({
      fullname,
      email,
      avatar
    })
    .then(() => {
      return res.status(200).send({
        message: 'New user created'
      })
    })
    .catch(e => res.status(500).send({ message: 'Internal Server error', e }))
  })
  .catch(e => res.status(500).send({ message: 'Internal Server error', e }))
});

export default router;


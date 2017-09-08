import models from '../models';

const User = models.User;

export default {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json({error}));
  },
  fetchAll(req, res) {
    return User
      .findAll({})
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({error}));
  }
};

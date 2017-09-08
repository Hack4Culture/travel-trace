import userController from '../controllers/users';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).json({
    message: "API works"
  }));

  app.post('/api/user', userController.create);
  app.get('/api/users', userController.fetchAll);
};

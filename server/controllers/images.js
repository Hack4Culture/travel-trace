import models from '../models';

const Image = models.Image;

export default {
  upload(req, res) {
    return Image
      .create({
        public_id: req.body.public_id,
        version: req.body.version,
        signature: req.body.signature,
        width: req.body.width,
        height: req.body.height,
        format: req.body.format,
        resource_type: req.body.resource_type,
        url: req.body.url,
        secure_url: req.body.secure_url,
        name: req.body.name
      })
      .then(image => res.status(200).json(image))
      .catch(error => res.status(400).json({error}));
  },
  fetchAll(req, res) {
    return Image
      .findAll({})
      .then(images => res.status(200).json(images))
      .catch(error => res.status(400).json({error}));
  }
};

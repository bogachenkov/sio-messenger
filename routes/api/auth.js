const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/login', (req, res) => {
  const errors = {};
  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) {
        errors.username = 'Пользователь не найден';
        return res.status(404).json(errors);
      }
      if (user.password !== req.body.password) {
        errors.password = 'Неверный пароль';
        return res.status(400).json(errors);
      }
      return res.json(user);
    })
    .catch(err => res.status(422).json(err));
})

module.exports = router;
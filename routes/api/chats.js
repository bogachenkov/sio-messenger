const express = require('express');
const router = express.Router();

const Chat = require('../../models/Chat');

router.get('/all/:user_id', (req, res) => {
  Chat.find()
    .in('members.user', req.params.user_id)
    .populate('members.user')
    .sort('-_updated')
    .then(chats => res.json(chats))
    .catch(err => res.status(422).json(err));
});

router.get('/:chat_id', (req, res) => {
  const errors = {};
  Chat.findById(req.params.chat_id)
    .populate('members.user')
    .then(chat => res.json(chat))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
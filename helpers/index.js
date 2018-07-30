module.exports = {
  deleteSocket: (u_id) => {
    User.findById(u_id)
    .then(user => {
      user.socket_id = null;
      user.save();
    })
    .catch(err => console.error('Ошибка ', err)); 
  },
  setSocket: (u_id, socket_id) => {
    User.findById(u_id)
    .then(user => {
      user.socket_id = socket_id;
      user.save();
    })
    .catch(err => console.error('Ошибка ', err));
  },
  updateUserLastSeen: (chat, u_id) => {
    return [...chat.members].map(member  => {
      if (member.user == u_id) member.last_seen = Date.now();
      return member;
    });
  },
  updateUserLastSeenIfOnline: (chat, u_id, socketList) => {
    return [...chat.members].map(member  => {
      if (member.user._id == u_id && socketList[member.user.socket_id]) member.last_seen = Date.now();
      return member;
    });
  }
}
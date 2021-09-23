const users = [];

const addUser = ({ sid, room, name }) => {
  if(!name || !room) return { error: 'Username and room are required.' };

  name = name.trim();
  room = room.trim();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(existingUser) return { error: 'Username is taken.' };

  const user = { sid, room, name };

  users.push(user);

  return { user };
}

const removeUser = (sid) => {
  const index = users.findIndex((user) => user.sid === sid);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (sid) => users.find((user) => user.sid === sid);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

const users = [];

const addUser = ({ sid, name }) => {
    const user = { sid, name };
    users.push(user);
    return user;
}

module.exports = {
    addUser
}

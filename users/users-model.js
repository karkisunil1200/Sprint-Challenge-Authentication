const db = require('../database/dbConfig');

module.exports = {
  addUsers,
  getUsers,
  findBy
};

function addUsers(user) {
  return db
    .select('*')
    .from('users')
    .insert(user);
}

function getUsers() {
  return db.select('*').from('users');
}

function findBy(username) {
  return db
    .select('*')
    .from('users')
    .where(username);
}

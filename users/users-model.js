const db = require('../database/dbConfig');

module.exports = {
  addUsers
};

function addUsers(user) {
  return db
    .select('*')
    .from('users')
    .insert(user);
}

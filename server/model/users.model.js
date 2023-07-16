const knex = require("../../db/knex");
// user table
const USERS_TABLE = "users";

// export 
module.exports = {
  USERS_TABLE,
  getUserData(uid) { 
    return knex
      .select("*")
      .from(USERS_TABLE)
      .where({ "UID": uid })
  }
}
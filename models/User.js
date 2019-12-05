const { Model } =require("objection");
const knex = require('knex');

const KnexConfig = require('../knexfile');

Model.knex(knex(KnexConfig.development));

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;
const { Model } =require("objection");
const knex = require('knex');

const KnexConfig = require('../knexfile');

Model.knex(knex(KnexConfig.development));

class Otp extends Model {
  
  static get tableName() {
    return 'otp';
  }
}


module.exports=Otp;
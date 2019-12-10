const { Model } =require("objection");
const knex = require('knex');
// const Application=require("./Application");
const Job=require("./Job");
const KnexConfig = require('../knexfile');
// const Job=require("./Job");

const { BaseModel } = require("./BaseModel");

Model.knex(knex(KnexConfig.development));

class User extends BaseModel {
  
  static get tableName() {
    return 'users';
  }

  static relationMappings(){
    const Application=require("./Application");
   return {
    appliedjobs: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Job',
      join: {
        from: "users.id",
        through: {
          from: "applications.user_id",
          to: "applications.job_id",
        },
        to: "jobs.id"
      }
    },
   }
  }
}

module.exports = User;
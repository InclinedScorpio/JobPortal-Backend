const { Model } =require("objection");
const User=require("./User.js");
const Job=require("./Job.js");
const knex = require('knex');

const KnexConfig = require('../knexfile');

Model.knex(knex(KnexConfig.development));


class Application extends Model {
  static get tableName() {
    return 'applications';
  }

  static get relationMappings() {
    return {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "applications.user_id",
                to: "users.id"
            }
        },
        jobs:{
            relation: Model.BelongsToOneRelation,
            ModelClass:Job,
            join:{
                from: "applications.job_id",
                to: "users.job_id"
            }
        }

    }
}
}

module.exports = Application;
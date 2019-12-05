const { Model } =require("objection");
const User = require("./User");
const Application=require("./Application");
const knex = require('knex');

const KnexConfig = require('../knexfile');

Model.knex(knex(KnexConfig.development));


class Job extends Model {
  static get tableName() {
    return 'jobs';
  }

  static get relationMappings() {
    return {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "jobs.recruiter_id",
                to: "users.user_id"
            }
        },
        applications: {
            relation:Model.HasManyRelation,
            modelClass: Application,
            join: {
              from: "jobs.job_id",
              to: "applications.job_id"
            }
        }
    }
  }
}

module.exports = Job;
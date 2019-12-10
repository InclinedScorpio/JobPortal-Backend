const { Model } =require("objection");
const User = require("./User");
const Application=require("./Application");
const knex = require('knex');

const KnexConfig = require('../knexfile');

const { BaseModel } = require("./BaseModel");

BaseModel.knex(knex(KnexConfig.development));

class Job extends BaseModel {
  static get tableName() {
    return 'jobs';
  }

  static get relationMappings() {
    return {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'User',
            join: {
                from: "jobs.recruiter_id",
                to: "users.id"
            }
        },
        candidates: {
          relation: Model.ManyToManyRelation,
          modelClass: 'User',
          join: {
            from: "jobs.id",
            through: {
              from: "applications.job_id",
              to: "applications.user_id",
            },
            to: "users.id"
          }
        },
        applications: {
            relation:Model.HasManyRelation,
            modelClass: 'Application',
            join: {
              from: "jobs.id",
              to: "applications.job_id"
            }
        }
    }
  }
}

module.exports = Job;
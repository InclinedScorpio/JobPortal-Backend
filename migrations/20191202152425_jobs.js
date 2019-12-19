
exports.up = function(knex) {
    return knex.schema.createTable("jobs",table=>{
      table.increments("id").primary();
      table.integer("recruiter_id").notNullable().unsigned();
      table.string("job_title").notNullable();
      table.string("job_description").notNullable()
      table.string("companyname").notNullable()
      table.string("uuid");

      table.foreign("recruiter_id").references("id").inTable("users");
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable("jobs");
  };
  
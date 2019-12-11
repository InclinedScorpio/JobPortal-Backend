
exports.up = function(knex) {
    return knex.schema.createTable("applications",table=>{
      table.increments("id").primary();
      table.integer("user_id").notNullable().unsigned();
      table.integer("job_id").notNullable().unsigned();
      table.string("uuid");
      
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("job_id").references("id").inTable("jobs");

    });
  };
  exports.down = function(knex) {
     return knex.schema.dropTable("applications");
  };
  
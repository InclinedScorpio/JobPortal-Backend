
exports.up = function(knex) {
  return knex.schema.createTable("users",table=>{
    table.increments("id").primary();
    table.string("uuid");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.integer("role").notNullable();
  });
};

exports.down = function(knex) {
   return knex.schema.dropTable("users");
};

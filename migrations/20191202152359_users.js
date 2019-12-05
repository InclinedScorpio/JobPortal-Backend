
exports.up = function(knex) {
  return knex.schema.createTable("users",table=>{
    table.increments("user_id").primary();//auto increments->don't show to user
    table.string("uuid");
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.integer("role").notNullable();
  });
};

exports.down = function(knex) {
   return knex.schema.dropTable("users");
};

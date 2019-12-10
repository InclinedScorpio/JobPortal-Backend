
exports.up = function(knex) {
    return knex.schema.createTable("otp",table=>{
        table.increments("id").primary();
        table.string("email").notNullable();
        table.integer("otp").notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("otp");
};

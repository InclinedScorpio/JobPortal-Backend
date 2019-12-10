
exports.up = function(knex) {
    return knex.schema.alterTable("users",function(table){
        table.increments("id").primary();
    })
  
};

exports.down = function(knex) {
  
};

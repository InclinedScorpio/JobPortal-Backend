
exports.up = function(knex) {
    return knex.schema.alterTable("jobs",function(table){
        table.increments("id").primary();
    })
  
};

exports.down = function(knex) {
  
};

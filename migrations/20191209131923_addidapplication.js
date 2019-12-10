
exports.up = function(knex) {
    return knex.schema.alterTable("applications",function(table){
        table.increments("id").primary();
    })
  
};

exports.down = function(knex) {
  
};

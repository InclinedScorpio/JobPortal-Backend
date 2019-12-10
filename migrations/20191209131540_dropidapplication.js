
exports.up = function(knex) {
    return knex.schema.alterTable("applications",function(table){
        table.dropColumn("id");
    })
};

exports.down = function(knex) {
  
};

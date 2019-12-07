
exports.up = function(knex) {

    return knex.schema.alterTable("applications",function(table){
        table.string("uuid");
    });
  
};

exports.down = function(knex) {
  
};

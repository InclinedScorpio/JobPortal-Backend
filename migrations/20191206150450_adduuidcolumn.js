
exports.up = function(knex) {

    return knex.schema.alterTable("jobs",function(table){
        table.string("uuid");
    });
  
};

exports.down = function(knex) {
  
};

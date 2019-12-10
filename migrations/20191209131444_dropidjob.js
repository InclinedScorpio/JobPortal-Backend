
exports.up = function(knex) {
    return knex.schema.alterTable("jobs",function(table){
        table.dropColumn("id");
    })

};

exports.down = function(knex) {
  
};

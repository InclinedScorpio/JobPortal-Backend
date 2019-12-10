
exports.up = function(knex) {
    return knex.schema.table("users",function(table){
        table.renameColumn("user_id","id");

    })
};

exports.down = function(knex) {
  
};

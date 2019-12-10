
exports.up = function(knex) {
  return knex.schema.alterTable("users",function(table){
      table.dropColumn("id");
  })
};

exports.down = function(knex) {
  
};

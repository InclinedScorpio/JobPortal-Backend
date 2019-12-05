
exports.up = function(knex) {
  return knex.schema.table("jobs",table=>{
    table.dropColumn("profile");
  });
};

exports.down = function(knex) {
  
};

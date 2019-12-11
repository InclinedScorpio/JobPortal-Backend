
exports.up = function(knex) {
    return knex.schema.table("users",table=>{
        table.index("id");
      });
};

exports.down = function(knex) {
  
};

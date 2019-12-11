
exports.up = function(knex) {
    return knex.schema.table("jobs",table=>{
        table.index("id");
      });
};

exports.down = function(knex) {
  
};

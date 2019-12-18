
exports.up = function(knex) {
    return knex.schema.table("jobs",table=>{
        table.timestamps(false,true);
      });
};

exports.down = function(knex) {
  
};

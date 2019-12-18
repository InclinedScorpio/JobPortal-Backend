
exports.up = function(knex) {
    return knex.schema.table("applications",table=>{
        table.timestamps(false,true);
      });
};

exports.down = function(knex) {
  
};

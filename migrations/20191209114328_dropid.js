
exports.up = function(knex) {
  return knex.schema.table("jobs",function(table){
      table.renameColumn("job_id","id");
    // table.renameColumn("jobs_id", "id");
  })
};

exports.down = function(knex) {
  
};

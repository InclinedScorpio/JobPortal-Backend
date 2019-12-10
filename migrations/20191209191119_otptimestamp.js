
exports.up = function(knex) {
    return knex.schema.table("otp",table=>{
      table.timestamps(false,true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("otp",table=>{
        table.dropTimestamps();
    })
  };
  
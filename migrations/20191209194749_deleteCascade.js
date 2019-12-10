
exports.up = function(knex) {
    return knex.schema.alterTable("users",table=>{
        table.foreign('id').onDelete('CASCADE').references('user_id')
    });
};

exports.down = function(knex) {
  
};

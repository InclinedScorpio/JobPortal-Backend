
exports.up = function(knex) {
    return knex.schema.alterTable("users",table=>{
        table.foreign('applications.user_id').onDelete('CASCADE').references('id')
    });
};

exports.down = function(knex) {
  
};

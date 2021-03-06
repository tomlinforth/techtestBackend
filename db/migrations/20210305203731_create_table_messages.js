
exports.up = function(knex) {
    return knex.schema.createTable('messages', (msgTable) => {
        msgTable.increments('msg_id').primary();
        msgTable.string('contact_number').references('contacts.contact_number').notNullable();
        msgTable.string('to').notNullable();
        msgTable.string('from').notNullable();
        msgTable.text('body').notNullable();
        msgTable.timestamp("sent_at").defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};

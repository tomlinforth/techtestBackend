
exports.up = function(knex) {
    return knex.schema.createTable("contacts", (contactsTable) => {
        contactsTable.string('contact_number').primary().unique().notNullable();
        contactsTable.string('first_name');
        contactsTable.string('last_name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contacts');
};

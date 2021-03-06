const {
    contactsData,
    messageData
} = require('../data/index')

exports.seed = function(knex) {
    return knex.migrate
        .rollback()
        .then(() => knex.migrate.latest())
        .then(() => {
            const contactsInsertions = knex('contacts').insert(contactsData);
            const messageInsertions = knex('messages').insert(messageData);

            return Promise.all([contactsInsertions, messageInsertions])
        })
}
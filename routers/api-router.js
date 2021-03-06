const apiRouter = require('express').Router();
const {
    addNewMessage,
    sendAllContacts,
    sendMessagesByContactNum,
    addNewContact
} = require('../controllers/controllers')

apiRouter
    .route("/messages")
    .post(addNewMessage);

apiRouter
    .route('/contacts')
    .get(sendAllContacts)
    .post(addNewContact)

apiRouter
    .route('/messages/:contactNum')
    .get(sendMessagesByContactNum)
    
module.exports = apiRouter;
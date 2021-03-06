const apiRouter = require('express').Router();
const {
    addNewMessage,
    sendAllContacts,
    sendMessagesByContactNum
} = require('../controllers/controllers')

apiRouter
    .route("/messages")
    .post(addNewMessage);

apiRouter
    .route('/contacts')
    .get(sendAllContacts)

apiRouter
    .route('/messages/:contactNum')
    .get(sendMessagesByContactNum)
module.exports = apiRouter;
const {
    insertNewMessage,
    selectAllContacts,
    selectMessagesByContactNum
} = require('../models/models');

exports.addNewMessage = (req, res, next) => {
    insertNewMessage(req.body)
        .then(([message]) => {
            res.status(201).send({ message });
        })
        .catch(next);
};

exports.sendAllContacts = (req,res,next) => {
    selectAllContacts()
        .then(contacts => {
            res.status(200).send({contacts});
        })
        .catch(next);
}

exports.sendMessagesByContactNum = (req,res,next) => {
    selectMessagesByContactNum(req.params)
        .then(messages => {
            res.status(200).send({messages})
        })
        .catch(next)
}
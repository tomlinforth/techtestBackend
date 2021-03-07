const {
    insertNewMessage,
    selectAllContacts,
    selectMessagesByContactNum,
    insertNewContact
} = require('../models/models');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.addNewMessage = (req, res, next) => {
    insertNewMessage(req.body)
    .then(([message]) => {
            const twiml = new MessagingResponse();
            console.log(req.body.Body)
            twiml.message('This is a test response');
            res.writeHead(201, {'Content-Type':'text/xml'})
            res.end(twiml.toString())
            // res.status(201).send({ message });
        })
        .catch(next);
};

exports.sendAllContacts = (req,res,next) => {
    console.log("controller start")
    selectAllContacts()
        .then(contacts => {
            console.log('controller end')
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

exports.addNewContact = (req,res,next) => {
    insertNewContact(req.body)
        .then(([contact]) => {
            res.status(201).send({contact})
        })
        .catch(next)
}
const connection = require("../db/connection");
const client = require('twilio')(process.env.twilioSID, process.env.twilioTOK);

checkIfContactExists = (contactNum) => {
    return connection('contacts')
        .select('*')
        .where('contact_number', contactNum)
        .then(contact => {
            if(contact.length !== 0) return Promise.reject({msg:'Contact already exist',status:400})
            else return contact;
        })
}

exports.insertNewMessage = (newMessage) => {
    const messageData = {
        contact_number: newMessage.From == '+12286410309' ? newMessage.To : newMessage.From,
        to : newMessage.To, 
        from : newMessage.From, 
        body : newMessage.Body
    };
    if(newMessage.From == '+12286410309') {
        return client.messages
        .create({
            body: newMessage.Body,
            from: '+12286410309',
            to: newMessage.To
        }).then(message => {
            return connection('messages')
            .insert(messageData)
            .returning('*');
        })
    } else {
    return connection('messages')
        .insert(messageData)
        .returning('*');
}}

exports.selectAllContacts = () => {
    return connection("contacts").select("*")
};

exports.selectMessagesByContactNum = ({contactNum}) => {
    const messageKeys = ["to","from","body","sent_at"]
    return connection('messages')
        .select(...messageKeys)
        .where('contact_number', contactNum)
        .orderBy("sent_at", "asc");
}

exports.insertNewContact = (newContact) => {
    const contactData = connection('contacts').insert(newContact).returning('*')
    const contactCheck = checkIfContactExists(newContact.contact_number)
    return Promise.all([contactCheck,contactData]).then(([contactCheck, contactData]) => {
        return contactData;
    })
}
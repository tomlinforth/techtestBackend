const connection = require("../db/connection");
const accountSid = 'AC474d05a343981b3b30086e2ca14c136c';
const authToken = 'f7af53a21d82107cf9b08c11b4e9b08b';
const client = require('twilio')(accountSid, authToken);

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
            body: messageInp,
            from: '+12286410309',
            to: this.props.curContact
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
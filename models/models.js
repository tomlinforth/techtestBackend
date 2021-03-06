const connection = require("../db/connection");

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
        contact_number: newMessage.From == '+14155238886' ? newMessage.To : newMessage.From,
        to : newMessage.To, 
        from : newMessage.From, 
        body : newMessage.Body
    };
    console.log(messageData)
    return connection('messages')
        .insert(messageData)
        .returning('*');
}

exports.selectAllContacts = () => {
    console.log('models working')
    return connection("contacts").select("*")
};

exports.selectMessagesByContactNum = ({contactNum}) => {
    const messageKeys = ["to","from","body","sent_at"]
    return connection('messages')
        .select(...messageKeys)
        .where('contact_number', contactNum);
}

exports.insertNewContact = (newContact) => {
    const contactData = connection('contacts').insert(newContact).returning('*')
    const contactCheck = checkIfContactExists(newContact.contact_number)
    return Promise.all([contactData, contactCheck]).then(([contactData, contactCheck]) => {
        return contactData;
    })
}
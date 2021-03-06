const connection = require("../db/connection");

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
    return connection('contacts').select('*')
};

exports.selectMessagesByContactNum = ({contactNum}) => {
    const messageKeys = ["to","from","body","sent_at"]
    return connection('messages')
        .select(...messageKeys)
        .where('contact_number', contactNum);
}
const Message = require('../../models/message');

const sendMessage = async (req, res) => {
    const message = new Message(req.body);
    try {
        console.log(message);
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getMessage = async (req,res) => {
    const message = await Message.find({$or: [{ sender: req.body.email }, { reciver: req.body.email }]});
    
    try {
        res.status(200).json(message);
    }
    catch (err) {
        res.status(err.status).json(err);
    }
};

const deleteMessage = async (req, res) => {
    console.log(req.params.id);
    try {
        const message = await Message.findById(req.params.id);
        await message.delete();
        res.status(200).json("Wiadomość została usunięta");
    } catch (err) {
        res.status(500).json(err);
    }
};


const readMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        await message.updateOne({ $set: { read: true } });
        res.status(200).json("Wiadomość została oznaczona jako przeczytana");
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    sendMessage,
    getMessage,
    deleteMessage,
    readMessage
};
const User = require('../../models/user');

const addUser = async (req, res) => {
    const user = req.body;

    console.log(user);

    try {
        console.log(req.body);
        const user = await User.create(req.body);
        user.save()
    
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const deleteUser = async (req, res) => {
    const user = req.body;
    try {
        const users = await User.deleteOne(user);
        res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getEmail = async (req, res) => {
    try {
        const users = await User.find();
        let emails = []
        users.forEach(user => {
            emails.push({value: user.email, label: user.email})
        })
        res.status(200).json({ emails });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    getEmail
};
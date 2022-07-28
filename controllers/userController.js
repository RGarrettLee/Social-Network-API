const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => !user ? res.status(404).json({ message: 'Could not find a user with that ID'}) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User with this ID does not exist.' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
       
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                return res.status(404).json({ message: 'No user with this id' });
            }   
                return Thought.deleteMany({ _id: { $in: user.thoughts } });   //Sweepstakes.deleteMany({ client_id: this._id });
            })
            .then(() => {
                res.json({ message: 'Successfully deleted User' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User with this ID does not exist.' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User with this ID does not exist.' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};
module.exports = userController;
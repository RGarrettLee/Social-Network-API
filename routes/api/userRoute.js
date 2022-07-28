const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// user endpoint
router.route('/').get(getUsers).post(createUser);

// userId endpoint
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// userId -> friendId endpoint
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
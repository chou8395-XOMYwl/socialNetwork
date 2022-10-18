const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
} = require('../../controllers.js/user-controller');

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;

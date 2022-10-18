const router = require('express').Router();

const {
    getAllThoughts,
    getIdThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers.js/thought-controller');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:thoughtId')
    .get(getIdThought)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

router
    .route('/:userId')
    .post(addThought);




module.exports = router;
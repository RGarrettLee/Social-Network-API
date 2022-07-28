const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// thoughts endpoint
router.route('/').get(getThoughts).post(createThought);

// thoughtId endpoint
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// reacitons endpoint
router.route('/:thoughtId/reactions').post(addReaction);

// reactionId endpoint
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
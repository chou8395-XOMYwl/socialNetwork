const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    getIdThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found." });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
},

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log("body=", body);
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
      body, 
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete and remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true} 
    )
      .then(dbThoughtData => {

        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found.' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  removeThought({ params }, res) {
    Thought.findOneAndDelete( { _id: params.thoughtId})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found."})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
}

module.exports = thoughtController;
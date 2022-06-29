const { Thought, User } = require("../models");

// create thoughts controller
const thoughtsController = {
  // Create new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts found by this ID!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET thought by ID
  getThoughById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(400).json({ message: "No thought found with this ID!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // UPDATE thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create new reaction
  newReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE reaction by ID
  deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.json(404).json({message: 'No reaction found with this ID!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }

};


module.exports = thoughtsController;

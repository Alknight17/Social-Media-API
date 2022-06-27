const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thought: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY hh:mm a')
        },
        reactions: [ReactionSchema],
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


const ReactionSchema = new Schema(
    {
        reaction: {
            type: String, required: true, 
            maxlength: 280
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            deault: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY hh:mm a')
        },
        toJSON: {
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;
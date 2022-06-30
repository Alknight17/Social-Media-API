const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        thoughts: [{
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
    }, {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);


module.exports = User;
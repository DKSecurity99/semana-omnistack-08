const { Schema, model } = require('mongoose');

const DevSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectID,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectID,
        ref: 'Dev',
    }],
}, {
    timestamps: true,
});

module.exports = model('Dev', DevSchema);


const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    label: {
        type: String
    },
    members: [
        {
            _id: false,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            name: {
                type: String,
                required: true
            },
        },
    ],
    archived: {
        type: Boolean,
        required: true,
        default: false
    },

});

module.exports = Card = model('card0, CardSchema');
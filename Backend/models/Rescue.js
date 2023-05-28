const mongoose = require('mongoose');
const { Schema } = mongoose;
const RescueSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    description: {
        type: String,
    },
    images: {
        type: [String], // Modified to array type
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});
const Rescue = mongoose.model('rescue', RescueSchema);
module.exports = Rescue;

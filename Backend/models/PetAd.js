const mongoose = require('mongoose');
const { Schema } = mongoose;
const petAdSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
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
        default: Date.now,
    }
});
const petAd = mongoose.model('ads', petAdSchema);
module.exports = petAd;

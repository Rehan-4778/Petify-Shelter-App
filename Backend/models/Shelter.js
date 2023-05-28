const mongoose = require('mongoose');
const { Schema } = mongoose;
const ShelterSchema = new Schema({
    status: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
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
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    website: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Shelter = mongoose.model('shelter', ShelterSchema);
module.exports = Shelter;

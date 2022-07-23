const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new Schema({
    plantname: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    daysbetweenwatering: { type: Number, required: true },
    description: { type: String, required: false }
}, {
    timestamps: true,
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
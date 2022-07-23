const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wateringSchema = new Schema({
    plantname: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    health: { type: String, required: false },
    comment: { type: String, required: false }
}, {
    timestamps: true,
});

const Watering = mongoose.model('Watering', wateringSchema);

module.exports = Watering;
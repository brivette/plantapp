const router = require('express').Router();
const { Router } = require('express');
let Watering = require('../models/watering.model');



// Get all entries
router.get('/', async (req, res) => {
    try {
        const waterings = await Watering.find()
        res.json(waterings)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one entry
router.get('/:id', getWatering, (req, res) => {
    res.json(res.watering)
})


// Adding a watering
router.post('/', async (req, res) => {
    const watering = new Watering({
        plantname: req.body.plantname,
        date: Date.parse(req.body.date),
        health: req.body.health,
        comment: req.body.comment
    })

    try {
        const newWatering = await watering.save()
        res.status(201).json(newWatering)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting The Watering
router.delete('/:id', getWatering, async (req, res) => {
    try {
       await res.watering.remove()
       res.json({  message: `${req.params.id} deleted` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


async function getWatering(req, res, next) {
    try {
        watering = await Watering.findById(req.params.id)
        if (watering == null) {
            return res.status(404).json({ message: 'Cannot find this watering' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.watering = watering;
    next()
}

module.exports = router;
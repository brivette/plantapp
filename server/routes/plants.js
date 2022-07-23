const express = require('express');
const router = express.Router();
let Plant = require('../models/plant.model');

// Get all plants
router.get('/', async (req, res) => {
    try {
        const plants = await Plant.find()
        res.json(plants)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one Plant
router.get('/:id', getPlant, (req, res) => {
    res.json(res.plant)
})

// Adding a plant
router.post('/', async (req, res) => {
    const plant = new Plant({
        plantname: req.body.plantname,
        location: req.body.location,
        daysbetweenwatering: Number(req.body.daysbetweenwatering),
        description: req.body.description
    })

    try {
        const newPlant = await plant.save()
        res.status(201).json(newPlant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});


// Updating Plant Details
router.patch('/:id', getPlant, async (req, res) => {
    if (req.body.plantname != null) {
        res.plant.plantname = req.body.plantname
    }
    if (req.body.location != null) {
        res.plant.location = req.body.location
    }
    if (req.body.daysbetweenwatering != null) {
        res.plant.daysbetweenwatering = req.body.daysbetweenwatering
    }
    if (req.body.description != null) {
        res.plant.description = req.body.description
    }
    try {
        const updatedPlant = await res.plant.save()
        res.json(updatedPlant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting The Plant
router.delete('/:id', getPlant, async (req, res) => {
    try {
       await res.plant.remove()
       res.json({  message: `${req.params.id} deleted` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
  

// This is middleware. This is setting up functionality to get the plant by the ID by passing in the ID. If it finds the plant 
// it'll continue to next(); if not it'll send a 404 error that it 'cannot find plant'. The middware can be used in any request 
// requiring the id. 

async function getPlant(req, res, next) {
    try { 
        plant = await Plant.findById(req.params.id)
        if (plant == null) {
            return res.status(404).json({ message: 'Cannot find plant' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.plant = plant;
    next()
}

module.exports = router;

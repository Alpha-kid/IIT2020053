const express = require('express');
const router = express.Router();
const id = require('../model/Id');

router.post('/create', async (req,res) => {
    // res.json("Hello create")
    data = {
        "identification_number": "4 7363 39613 02 7",
        "name": "Mr. Rotngern",
        "last_name": "Yoopm",
        "date-of-birth": "31/03/2006",
        "date-of-issue": "15/09/2020",
        "date-of-expiry": "05/02/2026"
    }

    const IdData = new id({
        results : data,
        status : true,
    })

    await IdData.save();

    res.json(IdData);
})

module.exports = router;
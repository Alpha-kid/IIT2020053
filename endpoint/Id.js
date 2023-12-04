const express = require('express');
const router = express.Router();
const id = require('../model/Id');


router.post('/create', async (req,res) => {
    try {
        const IdData = new id({
            results : req.body,
            status : true,
        })
        await IdData.save();
        res.json({success : true});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})



module.exports = router;
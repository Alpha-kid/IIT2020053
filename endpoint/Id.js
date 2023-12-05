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

router.patch('/search', async (req,res) => {
    console.log(req.body)
    try {
        // [Key,value] = req.body
        const data = req.body
        let arr = [];
        for (const key in data) {
            arr.push(key)
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                arr.push(value)
                console.log(`Key: ${key}, Value: ${value}`);
            }
        }

        const key = `results.${arr[0]}`;
        const value = arr[1];

        console.log(key,value)

        let id_data = await id.find({[key] : value})

        if(id_data){
            console.log('found Data', id_data)
        }else{
            console.log("not found data")
        }

        res.json(id_data)
        // res.redirect(`/wanttoadd.html?jsonData=${encodeURIComponent(JSON.stringify(id_data))}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})
router.put('/update', async (req, res) => { // put for update the database
    try {
        const data = req.body
        let arr = [];
        for (const key in data) {
            arr.push(key)
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                arr.push(value)
                // console.log(`Key: ${key}, Value: ${value}`);
            }
        }
        let key=`results.${arr[0]}`;
        let value=arr[1]
        let updateKey=`results.${arr[2]}`;
        let updateValue=arr[3]
        const filter = { [key]: value }; // the key-value pair to identify the document to update
        const update = { $set: { [updateKey]: updateValue } }; // the key-value pair to update
        console.log(filter)
        console.log(update)
        const result = await id.updateOne(filter, update);
        res.json(result)

    } catch (error) {
        console.log(error)
        res.json({ error: error.message });
    }

})
router.delete('/Delete', async (req, res) => { // put for update the database
    try {
        const data = req.body
        let arr = [];
        for (const key in data) {
            arr.push(key)
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                arr.push(value)
                // console.log(`Key: ${key}, Value: ${value}`);
            }
        }
        let key=`results.${arr[0]}`;
        let value=arr[1]
        const filter = { [key]: value }; // the key-value pair to identify the document to update
        
        console.log(filter)
        const result = await id.deleteOne(filter);
        res.json(result)

    } catch (error) {
        console.log(error)
        res.json({ error: error.message });
    }

})



module.exports = router;
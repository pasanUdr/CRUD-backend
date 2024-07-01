const express = require('express')
const app = express()
const mongoose = require('mongoose');

app.use(express.json());

//schema
const schemaData = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "email": String
}, {
    timestamps: true
})

//model
const userModel = mongoose.model("user", schemaData)

//create
app.post('/create', async(req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved successfully", data: data })
})

//read
app.get('/', async(req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//update
app.put('/update', async(req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

//delete
app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})

//MongoDB connect
mongoose.connect('mongodb://localhost:27017/testCRUD')
    .then(() => {
        console.log('Connected to DB')
        app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`)) // app.listen(3000)
    })
    .catch((err) => console.log(err));

app.listen(3000)
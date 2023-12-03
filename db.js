const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://FCJ1234:kY7DydCrlFfo7OaI@cluster0.zwfl2.mongodb.net/ThaiIdRecognition?retryWrites=true&w=majority"

const connectToDatabase = () =>{
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoUrl,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    },() =>{
        console.log("database connected successfully");
    })
}

module.exports = connectToDatabase;
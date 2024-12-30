const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://dhakelokesh31:3FKWu68PJkqN9f5X@cluster0.j4f53.mongodb.net/inotebook"  // use your own mongo db cluster URI

const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        
        console.log("Connected to mongo successfully");
        
    })
}

module.exports = connectToMongo;
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://imessage:admin@cluster0.z6u4aec.mongodb.net/petify?retryWrites=true&w=majority", {
            // const conn = await mongoose.connect("mongodb://localhost:27017/DogShelter", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        // console.log(`MongoDb Connected: ${conn.connection.host}`)
        console.log(`MongoDb Connected`)
    }
    catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;
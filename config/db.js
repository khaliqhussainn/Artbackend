const mongoose = require("mongoose")

// const mongodburl = "mongodb+srv://vinicreation:FCsEsMTDAFU21Ur4@cluster0.7rvkhzb.mongodb.net/?retryWrites=true&w=majority"
const mongodburl = "mongodb+srv://khaliqhussain9711:iLzccqnkw5rFZZFa@clusterresin.wc5matq.mongodb.net/?retryWrites=true&w=majority"

const connectDb = () => {
    return mongoose.connect(mongodburl);
}

module.exports={connectDb}
// pass - iLzccqnkw5rFZZFa
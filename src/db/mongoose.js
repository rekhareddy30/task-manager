const mongoose = require("mongoose")
const validator = require("validator")

const { string, number } = require("yargs")


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})


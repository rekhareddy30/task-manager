const mongoose = require("mongoose")
const { string, number } = require("yargs")


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

/*const User = mongoose.model('User', {
    name: {
        type:String
    },
    age : {
        type:Number
    }
})

const me = new User({
    name: "Rekha",
    age: "test"
})

me.save().then( (me) => {
    console.log(me)
}).catch( (error) => {
    console.log(error)
})*/

const Task = mongoose.model('Tasks', {
    description : {
        type:String
    },
    completed:{
        type:Boolean
    }
})

const todolist = Task({
    description: "Meeting",
    completed:false
})

todolist.save().then( (todolist) => {
    console.log(todolist)
}).catch( (error) => {
    console.log(error)
})
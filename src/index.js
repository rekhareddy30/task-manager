const express = require("express")
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

/*app.use( (req, res, next) => {
    res.status(503).send("Server Under Maintenance.")
})*/

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is UP and Running." + port)
})

/*const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
   /* const task = await Task.findById("5f3ba9811ebdd710f8e145b3")
    await task.populate('owner').execPopulate()
    console.log(task.owner)
    const user = await User.findById("5f3ba8207c417d0c2ca25cb1")
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
   
}

main()*/

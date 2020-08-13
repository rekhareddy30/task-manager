require('../src/db/mongoose')
const Task = require('../src/models/task')

/*Task.findByIdAndDelete('5f2a7dcd3c255513a4f9db7d').then((task) => {
    console.log(task)
    return Task.countDocuments({completed:false})
}).then( (result) => {
    console.log(result)
}).catch( (e) => {
    console.log(e)
})*/

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('5f292ef8d2533b03cc625d16').then( (count) => {
    console.log(count)
}).catch( (e) => {
    console.log(e)
})
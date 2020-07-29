//CRUD operations
/*const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID*/

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser : true, useUnifiedTopology : true}, (error, client)=>{
    if(error){
        return console.log("Unable to connect the database.")
    }
    const db = client.db(databaseName)

    /*db.collection("users").deleteMany({
        age:9
    }).then((result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })*/
    db.collection("tasks").deleteOne({
        _id: new ObjectID("5f1aaee609f8d615507dec6f")
    }).then( (result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})

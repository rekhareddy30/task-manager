const express = require("express")
const Task = require('../models/task')

const router = new express.Router

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try{
         await task.save()
         res.status(201).send(task)
    }catch(e){
         res.status(500).send(e)
    }
 })
 
 
 router.get('/tasks', async (req, res) => {
     try{
         const tasks = await Task.find()
         res.status(201).send(tasks)
     }
     catch(e){
         res.status(500).send(e)
     }
 })
 
 router.get('/tasks/:id', async (req, res) => {
     const _id = req.params.id
     try{
         const task = await Task.findById(_id)
         if(!task)
         {
             return res.status(500).send(e)
         }
         res.status(201).send(task)
     }catch(e){
         res.status(500).send(e)
     }
 })
 
 
 router.patch('/tasks/:id', async(req, res) => {
 
     const updates = Object.keys(req.body)
     const allowedUpdate = ['description', 'completed']
     const isValidOperation = updates.every( (update) => allowedUpdate.includes(update) )
     if(!isValidOperation){
         res.status(201).send({error: "Invalid Update"})
     }
     try{
        const task = await Task.findById(req.params.id)
        updates.forEach( (update) => task[update] = req.body[update])
        await task.save()
        console.log(task)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
         if(!task){
             return res.status(404).send()
         }
         res.send(task)
     }
     catch(e){
         res.status(500).send(e)
     }
 })
 
 router.delete('/tasks/:id', async (req, res) => {
     try{
         const task = await Task.findByIdAndDelete(req.params.id)
         if(!task){
             return res.status(404).send()
         }
         res.send(task)
     }catch(e){
         res.status(500).send(e)
     }
 })

 
module.exports =router
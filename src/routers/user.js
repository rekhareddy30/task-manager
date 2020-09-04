const express = require("express")
const User = require('../models/user')
const auth = require("../middleware/auth")
const multer = require("multer")
const sharp = require("sharp")
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

const router = new express.Router()
const upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload a JPG image filr.'))
        }
        cb(undefined, true)
    }
})

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.get('/users/me', auth, async (req, res)=> {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
     const allowedUpdate = ['name', 'email', 'password', 'age']
     const isValidOperation = updates.every( (update) => allowedUpdate.includes(update))
     if(!isValidOperation){
         return res.status(400).send({error: "Invalid Update"})
     }
     try{
        updates.forEach( (update) => req.user[update] = req.body[update])
        await req.user.save();

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
         /*if(!user){
             return res.status(404).send(e)
         }*/
         res.status(201).send(req.user)
     }catch(e){
         res.status(400).send(e)
     }
 })
 router.delete('/users/me', auth, async (req, res) => {
    try{
        sendCancelEmail(req.user.email, req.user.name)
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
        console.log(e)
    }
})

router.post("/users/login", async (req, res) => {   
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token  = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avator = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send(error.message)
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avator = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send(error.message)
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avator){
            throw new Error()
    }
        res.set('Content-Type', 'image/png')
        res.send(user.avator)
    }catch{
        res.status(400).send()
    }
})
module.exports = router

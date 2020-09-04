const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const { Mongoose } = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    name:"Aarush",
    email:"aarush@cc.com",
    password:"abcd@1234",
    tokens:[{
        token:jwt.sign({_id: userOneId}, process.env.JWT_SECERT)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should signup a user', async () => {
   const response = await request(app).post('/users').send({
        name:'Rekha',
        email:'rekhareddy310@gmail.com',
        password:'abcd@1234'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

   // expect(response.body.user.name).toBe('Aarush')
   expect(response.body).toMatchObject({
       user:{
           name:"Aarush",
           email:"aarush@cc.com"
       },
       tokens:user.tokens[0].token
   })
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(201)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email:'dsas',
        password:"ancd$44"
    }).expect(400)
})

/*test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})*/
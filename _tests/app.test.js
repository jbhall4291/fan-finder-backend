const app = require('../app')
const request = require('supertest')
const data = require('../db/data/user-dev-data')
const mongoose = require('mongoose');
const {seedUsers} = require('../db/seed')
const db = require('../')

// beforeEach?
//  -> reseed database with supertest
// beforeEach(()=>{
//     return seedUsers()
// })



afterAll(()=>{
    return mongoose.connection.close()
})
// close hanging connections to server

describe('appTests', () => {
    describe('/api/users', () => {
        test('POST: 201, can post a new well formed user profile to the database', () => {
            const test_user = {
                "displayName": "Waluigi",
                "avatarURL": "https://en.meming.world/images/en/5/50/Waluigi.jpg"
            }

            return request(app)
                .post('/api/users')
                .send(test_user)
                .expect(201)
                .then((data)=>{
                    console.log(data)
                })
        })
    })
})
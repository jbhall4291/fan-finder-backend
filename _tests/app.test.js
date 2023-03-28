require('dotenv').config()
const app = require('../app')
const request = require('supertest')

const mongoose = require('mongoose');
const {seedUsers} = require('../db/seed')

// beforeEach?
//  -> reseed database with supertest
beforeEach( async ()=>{
    await seedUsers()

})

afterAll(()=>{
    console.log("after all")
    console.log("before close")
    mongoose.connection.close()
    console.log("after close")
})
 */

describe('appTests', () => {

    describe('app', () => {
        test('GET: 404 /api/non-existant-route', () => {
            return request(app)
                .get('/api/non-existant-route')
                .expect(404)
                .then(({body})=>{
                    expect(body.msg).toBe('Not Found')
                })
        })
    })


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

        test('GET: 200, can get users', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .then(({body})=>{
                    const users = body.users
                    expect(Array.isArray(users)).toBe(true)
                    users.forEach((user)=>{
                        expect(user).toHaveProperty('displayName', expect.any(String))
                        expect(user).toHaveProperty('avatarUrl', expect.any(String))
                        expect(user).toHaveProperty('uid', expect.any(String))
                    })
                })
        })
    })
})
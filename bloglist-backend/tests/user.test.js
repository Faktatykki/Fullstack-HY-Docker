/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()
    userObject = new User(helper.initialUsers[1])
    await userObject.save()
})

describe('users POST', () => {
    test('creating user works', async () => {
        const toSend = helper.oneUser

        await api
            .post('/api/users')
            .send(toSend)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
        
        const latestIndex = usersAtEnd.length - 1

        expect(usersAtEnd[latestIndex].name).toContain('Minnaryyni')
    })

    test('if added existing user to db, list does not grow', async () => {
        const toSend = helper.existingUser

        const res = await api
            .post('/api/users')
            .send(toSend)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `Miihku`')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('at least 3 chars in username and not added to db', async () => {
        const toSend = helper.lessThanThreeCharsUsername

        const res = await api
            .post('/api/users')
            .send(toSend)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('User validation failed: username: Length must be atleast 3 characters')
        
        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('at least 3 chars in password and not added to db', async () => {
        const toSend = helper.lessThanThreeCharsPassword

        const res = await api
            .post('/api/users')
            .send(toSend)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('password should be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('empty username returns right error and not added to db', async () => {
        const toSend = helper.emptyUsername

        //const atStart = await helper.usersInDb()

        const res = await api
            .post('/api/users')
            .send(toSend)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('User validation failed: username: Username missing')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('empty password returns right error and not added to db', async () => {
        const toSend = helper.emptyPassword

        //const usersAtStart = await helper.usersInDb()

        const res = await api
            .post('/api/users')
            .send(toSend)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('password missing')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
})

describe('users GET', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('get returns right amount', async () => {
        const res = await api.get('/api/users')

        expect(res.body).toHaveLength(2)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
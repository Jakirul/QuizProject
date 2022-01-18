const { MongoClient } = require('mongodb');
const User = require('../../../models/User')
jest.setTimeout("100000")


describe('insert', () => {
    let connection;
    let db;
    let create;
    beforeAll(async () => {
        connection = await MongoClient.connect("mongodb://user:pass@db:27017")
        db = await connection.db("quiz_dbtest");

        const body = { email: "test22@gmail.com", username: "test22", password: "test" }
        let hashed = "$2a$10$mlkoDgYgQ8J16DQzjsvjsuhzYGA4FSLrtOhcB8P0enad9WVLc1eI.";
        create = await User.create({ ...body, password: hashed });

    });

    afterAll(async () => {
        await connection.close();
    });



    it('all users', async () => {
        const users = await User.all;

        expect(users).toBeDefined()
    });

    it('Creates a new user', async () => {
        const body = { email: "test@gmail.com", username: "test", password: "test" }
        let hashed = "$2a$10$mlkoDgYgQ8J16DQzjsvjsuhzYGA4FSLrtOhcB8P0enad9WVLc1eI.";
        const users = await User.create({ ...body, password: hashed });

        expect(users).toBeDefined()
    });

    it('finds a user by username', async () => {
        const user = {
            _id: "61e5bf77ce4c2bc521a4db85",
            username: 'test',
            password_digest: '$2a$10$NpDh2dqBCVU0oDmwEb8FHe4WlmcTknnbzxD3UCVpDeZrbiNtjdHYS'
        }

        const users = await User.findByUsername(user.username);

        expect(users).toBeDefined()
    });

    it('finds a user by id', async () => {
        const users = await User.findByID(create.insertedId);

        expect(users).toBeDefined()
    });

})
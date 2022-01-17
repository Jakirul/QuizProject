const mockSend = jest.fn();
const mockJson = jest.fn();
const mockNext = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

const auth = require('../../../middleware/auth')
const app = require("../../../server");
const request = require("supertest");

//needs fixing
describe('verifyToken', ()=>{
    let api;
    global.request = request;
  

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
        await request(api).post('/register').send({email: "test@gmail.com", username: "test", password: "test"});
    });

    afterAll(async () => {
        await api.close()
    })

    test('verifies token', async ()=>{
        
        const test = await request(api).post('/login').send({username: "test", password: "test"});
        console.log("test = ", test.body.token)
        const mockReq = {headers:{authorization: test.body.token}}
        auth.verifyToken(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200)
    })
    test('fails verification', async ()=>{
        const mockReq = {headers:{authorization: "hello"}}
        auth.verifyToken(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(403)
    })

    test('missing token', async ()=>{
        const mockReq = {headers:{authorization: ""}}
        auth.verifyToken(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(403)
    })
})
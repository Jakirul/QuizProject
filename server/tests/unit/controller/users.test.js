const usersController = require('../../../controllers/users')
const User = require('../../../models/User')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("test users controller", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    afterAll(() => jest.resetAllMocks());

    describe('all', () => {
        test('User.all will return a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                .mockResolvedValue([]);
            await usersController.all(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    describe('all', () => {
        test('User.findByUsername will return a 200 status code', async () => {
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValue([]);
            const mockReq = { params: { username: "test" } }
            await usersController.findByUsername(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });
})
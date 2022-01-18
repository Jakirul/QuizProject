const gameController = require('../../../controllers/game')
const {Game} = require('../../../models/Game')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("test game controller", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    afterAll(() => jest.resetAllMocks());

    describe('allHighscore', () => {
        test('Game.home will return a 200 status code', async () => {
            let players = ['Jakirul', 'Robert']
            jest.spyOn(Game, 'allHighscore', 'get')
                .mockResolvedValue(players);
            await gameController.home(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(players);
        })
    });

    describe('scoreAdder', () => {
        test('Game.scoreAdder will return a 200 status code', async () => {
            let testUsername = "Jakirul";
            let testScore = 10;
            jest.spyOn(Game, 'scoreAdder')
                .mockResolvedValue(testUsername);
            const mockReq = { params: { username: testUsername, score: testScore } }
            await gameController.scoreAdder(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    describe("setGame", () => {
        test("Game.setGame will return a 200 status code", async () => {
            jest.spyOn(Game, 'setGame')
                .mockResolvedValue([]);
            const mockReq = { params: { categoryId: "19", difficulty: "easy", range: "10" } }
            await gameController.setGame(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    describe('setAnswer', () => {
        test('Game.setAnswer will return a 200 status code', async () => {
         
            let testSocketId = "_5bhv2d_Hc3rHk-FAAAC";
            let testGameId = "61e1d2dd01471fa670bb58f1";
            const list = { 
                answers: [
                    'Numbers',
                    'Benjamin Franklin',
                    'Toro',
                    'Greenwich Mean Time',
                    'True',
                    'Look',
                    'True',
                    'EGLL',
                    'The Goodies&lrm;',
                    'Cali'
                ],
                username: '_5bhv2d_Hc3rHk-FAAAC'
                } 
            
            
            jest.spyOn(Game, 'setAnswer')
                .mockResolvedValue([{},{},{}])
                const mockReq = {params:{socketId: testSocketId, gameId: testGameId}, body: list}
           

            await gameController.setAnswer(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    describe("getGameResults", () => {
        test("Game.getGameResults will return a 200 status code", async () => {
            jest.spyOn(Game, 'getGameResults')
                .mockResolvedValue([])
                const mockReq = {params: {id: "12345678"} }
           

            await gameController.getGameResults(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    describe("lobbyExists", () => {
        test("Game.lobbyExists will return a 200 status code", async () => {
            jest.spyOn(Game, 'lobbyExists')
                .mockResolvedValue([])
                const mockReq = {params: {id: "12345678"} }
           

            await gameController.lobbyExists(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    describe("getGameId", () => {
        test("Game.getGameId will return a 200 status code", async () => {
            jest.spyOn(Game, 'getGameId')
                .mockResolvedValue([])
                const mockReq = {params: {id: "12345678"} }
           

            await gameController.getGameId(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    describe("showLeaderboard", () => {
        test("Game.showLeaderboard will return a 200 status code", async () => {
          
            let players = ['Jakirul', 'Robert']
            jest.spyOn(Game, 'showLeaderboard')
                .mockResolvedValue(players);
            await gameController.showLeaderboard(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(players);
        })
    })

    describe("logScore", () => {
        test("Game.logScore will return a 200 status code", async () => {
          
            
            jest.spyOn(Game, 'logScore')
                .mockResolvedValue([]);
                const mockReq = {params: {username: "Jakirul", score: "25"} }
            await gameController.logScore(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    
})
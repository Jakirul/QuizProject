describe("game end points", () => {
    let api;
    beforeEach(async () => {
        await resetTestDB();
        // console.log("test db has been reset");
    });

    beforeAll(async () => {
        api = app.listen(5000, () =>
            console.log("Test server running on port 5000")
        );
    });

    afterAll(async () => {
        console.log("Gracefully stopping test server");
        await api.close();
    });

    it("home screen should load leaderboard", async () => {
        const resp = await request(api).get("/");
        expect(resp.statusCode).toEqual(200)
    })

    it('/Jakirul/12', async ()=>{
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTVhNWQ5ZTJiNWUwOWJkN2RmNWJjNSIsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE2NDI0NDAxNjgsImV4cCI6MTY0Mjc0MDE2OH0.36QC_s-jMyD9Uiere-O7bkwcOC62ISDP29AZaDovULc"

        const res = await request(api)
            .patch('/Jakirul/12')
            .set('Authorization','Bearer '+ authToken)
        
        expect(res.statusCode).toBe(200)
        //expect(res.text.msg).toBe('User found')
    })

    it("Unknown id should return a 200 res code", async () => {
        const resp = await request(api).get("/results/61e300f328361bfd19522f71");
        expect(resp.statusCode).toEqual(200)
    })

    it("Unknown id should return a 500 res code", async () => {
        const resp = await request(api).get("/results/1234567");
        expect(resp.statusCode).toEqual(500)
    })

    it("Unknown id should return a 500 res code", async () => {
        const resp = await request(api).get("/exists/1234567");
        expect(resp.statusCode).toEqual(500)
    })

    it("Unknown id should return a 500 res code", async () => {
        const resp = await request(api).get("/quizAnswers/1234567");
        expect(resp.statusCode).toEqual(500)
    })

    it("All leaderboard should display a 200 status code", async () => {
        const resp = await request(api).get("/all/leaderboard");
        expect(resp.statusCode).toEqual(200)
    })

    it("Should post a new score for existing username", async () => {
        const resp = await request(api).post("/Jakirul/25").send({ username: "Jakirul", score: 25 })
        expect(resp.statusCode).toEqual(200)
    })

    it("Should post a new score for new username", async () => {
        const randomNumber = Math.floor(Math.random() * 1000)
        const resp = await request(api).post(`/${randomNumber}Jakirul/55`).send({ username: `${randomNumber}Jakirul`, score: 55 })
        expect(resp.statusCode).toEqual(200)
    })

    it("Should create a new game", async () => {
        const resp = await request(api).post("/game/10/easy/10").send({ categoryId: "10", difficulty: "easy", range: "10" })
        expect(resp.statusCode).toEqual(200)
    })

    it("Should not create a new game", async () => {
        const resp = await request(api).post("/game/100/easy/10").send({ categoryId: "100", difficulty: "easy", range: "10" })
        expect(resp.statusCode).toEqual(500)
    })

    it("Should be able to set answers", async () => {
        const resp = await request(api).post("/LxelBPdcBLoFHkGQAAAK/61e300f328361bfd19522f71/answers").send({answers: ['Rosh Hashanah', 'True', 'Dogs'], username: 'LxelBPdcBLoFHkGQAAAK'})
        expect(resp.statusCode).toEqual(200)
    })

    it("Should fail to set answers", async () => {
        const resp = await request(api).post("/424234/34455/answers").send({ socketId: "424234", gameId: "34455" })
        expect(resp.statusCode).toEqual(500)
    })





})
describe('user endpoints', ()=>{
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
        await request(api).post('/register').send({email: "test@gmail.com", username: "test", password: "test"})
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

  
    it('Show all users', async()=>{
        const res = await request(api)
            .get('/user/all')
        expect(res.statusCode).toBe(200)

    })

    it('Show one user', async()=>{
        const res = await request(api)
            .get('/user/test')
            .send({username: "test"})
        expect(res.statusCode).toBe(200)

    })
})
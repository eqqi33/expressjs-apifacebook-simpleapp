const request = require('supertest');
const app = require('../app');
let agent = request.agent(app);

  describe('Test the login path', () => {
    test('It should response the GET method', (done) => {
        agent.get('/login').expect(200, done);
    });
});
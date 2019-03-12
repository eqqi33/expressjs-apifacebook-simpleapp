const request = require('supertest');
const app = require('../app');

describe('Test the login path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/login').expect(200, done);
    });
    test('It should response the GET method', (done) => {
        request(app).get('/login/facebook').expect(302, done);
    });       
});
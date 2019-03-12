const request = require('supertest');
const app = require('../app');

describe('Test the page root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/facebook/auth/callback');
        request(app).get('/page').set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo']).send().expect(302, done);
    });
});

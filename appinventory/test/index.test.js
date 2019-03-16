const request = require('supertest');
const app = require('../app');
let index = require('../routes/index');

describe('Test the page root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').expect(200, done);
    });
    test('It should response error the GET method', (done) => {
        request(app).get('/not-found').expect(404, done);
    });    
});
describe('Test function on index', () => {
    test('get pivot data 1', () => {
        let data = [
            { id: 1,firstname: 'Harlene',lastname: 'Lippett',email: 'hlippett0@cbc.ca',item: 'Barang1',quantity: 20,totalprice: '100000' },
            { id: 2,firstname: 'Marco',lastname: 'Bootyman',email: 'mbootyman1@163.com',item: 'Barang2',quantity: 15,totalprice: '225000' },
            { id: 3,firstname: 'Myles',lastname: 'Gomer',email: 'mgomer2@cornell.edu',item: 'Barang3',quantity: 3,totalprice: '135000' },
            { id: 5,firstname: 'Cherri',lastname: 'Cuncarr',email: 'ccuncarr4@so-net.ne.jp',item: 'Barang9',quantity: 7,totalprice: '210000' },
            { id: 9,firstname: 'Alden',lastname: 'Gasgarth',email: 'agasgarth8@ox.ac.uk',item: 'Barang1',quantity: 4,totalprice: '52000' },                
        ];
        let expectResult = [
           ['firstname','lastname','email','Barang1','Barang2','Barang3','Barang9'],
           ['Harlene','Lippett','hlippett0@cbc.ca',20,'0','0','0'],
           ['Marco','Bootyman','mbootyman1@163.com','0',15,'0','0'],
           ['Myles','Gomer','mgomer2@cornell.edu','0','0',3,'0'],
           ['Cherri','Cuncarr','ccuncarr4@so-net.ne.jp','0','0','0',7],            
           ['Alden','Gasgarth','agasgarth8@ox.ac.uk',4,'0','0','0']
        ];
        expect(index.getPivotArray(data,['firstname'],['lastname','email'], 'item', 'quantity')).toEqual(expectResult);
    });
    test('get pivot data 2', () => {
        let data = [
            { id: 1,firstname: 'Harlene',lastname: 'Lippett',email: 'hlippett0@cbc.ca',item: 'Barang1',quantity: 20,totalprice: '100000' },
            { id: 2,firstname: 'Marco',lastname: 'Bootyman',email: 'mbootyman1@163.com',item: 'Barang2',quantity: 15,totalprice: '225000' },
            { id: 3,firstname: 'Myles',lastname: 'Gomer',email: 'mgomer2@cornell.edu',item: 'Barang3',quantity: 3,totalprice: '135000' },
            { id: 5,firstname: 'Cherri',lastname: 'Cuncarr',email: 'ccuncarr4@so-net.ne.jp',item: 'Barang9',quantity: 7,totalprice: '210000' },
            { id: 9,firstname: 'Alden',lastname: 'Gasgarth',email: 'agasgarth8@ox.ac.uk',item: 'Barang1',quantity: 4,totalprice: '52000' },                
        ];
        let expectResult = [ 
            ['firstname','Barang1','Barang2','Barang3','Barang9'],
            ['Harlene',20,'0','0','0'],
            ['Marco','0',15,'0','0'],
            ['Myles','0','0',3,'0'],
            ['Cherri','0','0','0',7],
            ['Alden',4,'0','0','0']
        ];
        expect(index.getPivotArray(data,'firstname' ,'', 'item', 'quantity')).toEqual(expectResult);
    });
    test('Create DOM element without merge', () => {
        let data = [
            ['firstname','lastname','email','Barang1','Barang2','Barang3','Barang9'],
            ['Harlene','Lippett','hlippett0@cbc.ca',20,'0','0','0']
         ];
         let expectResult = "<tr><td id='col-0-0'>firstname</td><td id='col-0-1'>lastname</td><td id='col-0-2'>email</td><td id='col-0-3'>Barang1</td><td id='col-0-4'>Barang2</td><td id='col-0-5'>Barang3</td><td id='col-0-6'>Barang9</td></tr><tr><td id='col-1-0'>Harlene</td><td id='col-1-1'>Lippett</td><td id='col-1-2'>hlippett0@cbc.ca</td><td id='col-1-3'>20</td><td id='col-1-4'>0</td><td id='col-1-5'>0</td><td id='col-1-6'>0</td></tr>"
         expect(index.arrayToHTMLTable(data)).toEqual(expectResult); 
    });    
    test('Create DOM element with merge', () => {
        let data = [
            ['firstname','lastname','email','Barang1','Barang2','Barang3','Barang9'],
            ['Harlene','Lippett','hlippett0@cbc.ca',20,'0','0','0']
         ];
        let expectResult = "<tr><td id='col-0-0'>Full Name</td>\<td id='col-0-1'>Email</td><td id='col-0-2'>Barang1</td><td id='col-0-3'>Barang2</td><td id='col-0-4'>Barang3</td><td id='col-0-5'>Barang9</td></tr><tr><td id='col-1-0'>Harlene Lippett</td><td id='col-1-1'>hlippett0@cbc.ca</td><td id='col-1-2'><span class='new badge' data-badge-caption=''>20</span></td><td id='col-1-3'>0</td><td id='col-1-4'>0</td><td id='col-1-5'>0</td></tr>"
        expect(index.arrayToHTMLTable(data,"Full Name",0, [0,1],0,1)).toEqual(expectResult); 
    });
});

/* jshint esnext: true*/
var config = require('../config');
process.env.NODE_ENV = 'test';
process.env.PORT = config.port.test;

var assert = require('assert'),
    should = require('should'),
    http = require('http'),
    app = require('../app'),
    request = require('supertest'),
    UserDbService = require('../services/user-db');

var server = http.createServer(app);
var userTest = {
  name: 'foo bar',
  username: 'foo@foo.com',
  password: 'bar',
};
var shoppingListTest = null;
var shoppingListItemTest = null;

// delete all test data created in the database test during unit tests that failed
function cleanTestData(callback){
  UserDbService.getByUsername(userTest.username, function(err, result){
    if(result){
      UserDbService.remove(result, callback);
    }else{
      callback();
    }
  });
}

describe('routes tests', function () {

  before(function (done) {

    server.listen(config.port.test);
    server.on('listening', function(){
      request = request.agent(config.url.test);
      cleanTestData(done);
    });
  });

  after(function (done) {
    server.close(done);
  });

/**************    ROUTES INDEX    ****************/

  describe('route:  / ', function (){

    describe('GET /register', function(){
      it('respond with a page', function(done){
        request
          .get('/register')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
    describe('POST /register', function(){
      it('Create an user, loggin and go to App page', function(done){
        request
          .post('/register')
          .send(userTest)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.header.location, '/app');
            done();
          });
      });
    });

    describe('POST /register', function(){
      it('Try to create an user without fill the form. The user get back to /register page', function(done){
        // send an user with invalid properties
        var user = {};
        request
          .post('/register')
          .send(user)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.header.location, '/register');
            done();
          });
      });
      it('Try to create an user with invalid values. The user get back to /register page', function(done){
        request
          .post('/register')
          .send( { name : 123123, username : 'asdasdadasd', password : ''})
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.header.location, '/register');
            done();
          });
      });
    });

    describe('POST /register', function(){
      it('return an error with 500 STATUSCODE', function(done){
        // try to create a user with the same username
        var user = {
          name: 'Foo Bar',
          username: userTest.username,
          password: 'foo',
        };
        request
          .post('/register')
          .send(user)
          .expect('Content-Type', /json/)
          .expect(500) //created
          .end(function (err, res){
            should.equal(err, null);
            res.body.should.have.property('error');
            done();
          });
      });
    });

    describe('GET /login', function(){
      it('respond with a page', function(done){
        request
          .get('/login')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });

    describe('POST /login', function(){
      it('return 200 STATUSCODE and the app page', function(done){
        // do a login
        request
          .post('/login')
          .send(userTest)
          .expect(302)
          .end(function (err, res){
            should.equal(res.header.location, '/app');
            should.equal(err, null);
            done();
          });
      });
    });

    describe('GET /logout', function(){
      it('respond with 302 status code and redirect to /login', function(done){
        request
          .get('/logout')
          .expect(302)
          .end(function(err, res){
            should.equal(res.header.location, '/login');
            should.equal(err, null);
            done();
          });
      });
    });
    describe('GET /', function(){
      it('respond with index page', function(done){
        request
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });

  }); // end: route:  /

/**************  ROUTES SHOPPINGLISTS    ****************/

  describe('route: /shoppinglists', function (){

    before(function (done) {
      // login again
      request.post('/login').send(userTest).end(done);
    });
    after(function (done) {
      request.get('/logout').end(done);
    });
    describe('GET /shoppinglists', function(){
      it('respond with 200 status code and an empty array', function(done){
        request
          .get('/shoppinglists')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body.length, 0);
            done();
          });
      });
    });

    describe('POST /shoppinglists', function(){
      it('return 201 STATUSCODE and a shopping list object', function(done){
        var sl = {
          title: 'titleTest',
          color: '#FFFFFF'
        };
        request
          .post('/shoppinglists')
          .send(sl)
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            shoppingListTest = res.body;
            done();
          });
      });
    });

    describe('GET /shoppinglists/:id', function(){
      it('respond with 200 status code and a shopping list object', function(done){
        request
          .get('/shoppinglists/' + shoppingListTest._id)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body._id, shoppingListTest._id);
            done();
          });
      });
    });

    describe('PUT /shoppinglists/:id', function(){
      it('return 200 STATUSCODE and the object modified', function(done){
        var sl = {
          title: 'titleTest Modified',
          items: [{
            title: '1 brown bread',
            detail: 'yay!',
            wasPurchased: false,
          }]
        };
        request
          .put('/shoppinglists/' + shoppingListTest._id)
          .send(sl)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body._id, shoppingListTest._id);
            should.equal(res.body.title, 'titleTest Modified');
            should.equal(res.body.items.length, 1);
            done();
          });
      });
    });

    /**************  ROUTES SHOPPINGLISTS items   ****************/

    describe('GET /shoppinglists/:id/items', function(){
      it('respond with 200 status code and a list with one item', function(done){
        request
          .get('/shoppinglists/' + shoppingListTest._id + '/items')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body.length, 1);
            done();
          });
      });
    });

    describe('POST /shoppinglists/:id/items', function(){
      it('return 201 STATUSCODE and a shopping list object', function(done){
        var newItem = {
          title: '12 oranges',
          detail: 'Should prefer buy oranges from Brazil',
          wasPurchased: false,
        };
        request
          .post('/shoppinglists/' + shoppingListTest._id + '/items')
          .send(newItem)
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body.title, newItem.title);
            shoppingListTest.items.push(res.body);
            shoppingListItemTest = res.body;
            done();
          });
      });
    });

    describe('GET /shoppinglists/:id/items/:itemId', function(){
      it('respond with 200 status code and an item from a shoppinglist', function(done){
        request
          .get('/shoppinglists/' + shoppingListTest._id + '/items/' + shoppingListItemTest._id)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body._id, shoppingListItemTest._id);
            done();
          });
      });
    });

    describe('PUT /shoppinglists/:id/items/:itemId', function(){
      it('respond with 200 status code and an shoppinglist updated', function(done){
        shoppingListItemTest.title = '123 orange';
        request
          .put('/shoppinglists/' + shoppingListTest._id + '/items/' + shoppingListItemTest._id)
          .send(shoppingListItemTest)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(shoppingListItemTest.title, res.body.title);
            shoppingListItemTest = res.body;
            done();
          });
      });
    });

    describe('DELETE /shoppinglists/:id/items/:itemId', function(){
      it('respond with 200 status code and a shoppinglist updated without the old item', function(done){
        request
          .delete('/shoppinglists/' + shoppingListTest._id + '/items/' + shoppingListItemTest._id)
          .expect(200)
          .end(function (err, res){
            should.equal(err, null);
            var itemUpdated = res.body.items.find(e => e._id === shoppingListItemTest._id );
            should.equal(null, itemUpdated);
            done();
          });
      });
    });

    /***********************************************************/
    // delete the shopping at the end of all tests
    describe('DELETE /shoppinglists/:id', function(){
      it('respond with 200 status code', function(done){
        request
          .delete('/shoppinglists/' + shoppingListTest._id)
          .expect(200)
          .end(function (err, res){
            should.equal(err, null);
            done();
          });
      });
    });

  }); //end :route: /shoppinglists


  /*********************  ROUTES APP     *********************/

  describe('routes /app', function(){

    before(function (done) {
      request.get('/logout').end(done);
    });

    // describe('GET /app unlogged', function(done){
    //   it('respond with 303 status and redirects to /login', function(done){
    //     request
    //       .get('/app')
    //       .end(function (err, res){
    //         should.equal(err, null);
    //         should.equal(res.header.location, '/login');
    //         done();
    //       });
    //   });
    // });

    describe('GET /app logged', function(){
      before(function (done) {
        request.post('/login').send(userTest).end(done);
      });

      it('respond with a page', function(done){
        request
          .get('/app')
          .expect('Content-Type', /text\/html/)
          .end(function (err, res){
            should.equal(err, null);
            res.headers.location.should.containEql('/app');
            done();
          });
      });
    });

  }); // end ROUTES APP





}); // END routes tests

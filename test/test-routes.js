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
      it('return a new user with 201 STATUSCODE', function(done){
        request
          .post('/register')
          .send(userTest)
          .expect('Content-Type', /json/)
          .expect(201) //created
          .end(function (err, res){
            should.equal(err, null);
            res.body.should.have.property('_id');
            done();
          });
      });
    });

    describe('POST /register', function(){
      it('return an error with 400 STATUSCODE', function(done){
        // send an user with invalid properties
        var user = {};
        request
          .post('/register')
          .send(user)
          .expect('Content-Type', /json/)
          .expect(400) //created
          .end(function (err, res){
            should.equal(err, null);
            res.body.should.have.property('error');
            done();
          });
      });
    });

    describe('POST /register', function(){
      it('return an error with 500 STATUSCODE', function(done){
        // try to create the same user
        var user = {
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
      it('return 200 STATUSCODE', function(done){
        // do a login
        request
          .post('/login')
          .send(userTest)
          .expect(200)
          .end(function (err, res){
            should.equal(err, null);
            done();
          });
      });
    });

    describe('GET /logout', function(){
      it('respond with 200 status code', function(done){
        request
          .get('/logout')
          .expect(200, done);
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

  describe('route: /shoppinglists', function (){

    before(function (done) {
      // login again
      request.post('/login').send(userTest).expect(200).end(done);
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
          title: 'titleTest'
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
          itens: [{
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
            should.equal(res.body.itens.length, 1);
            done();
          });
      });
    });

    /* ========== ITENS ROUTES TESTS =============== */

    describe('GET /shoppinglists/:id/itens', function(){
      it('respond with 200 status code and a list with one item', function(done){
        request
          .get('/shoppinglists/' + shoppingListTest._id + '/itens')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body.length, 1);
            done();
          });
      });
    });

    describe('POST /shoppinglists/:id/itens', function(){
      it('return 201 STATUSCODE and a shopping list object', function(done){
        var item = {
          title: '12 oranges',
          detail: 'Should prefer buy oranges from Brazil',
          wasPurchased: false,
        };
        request
          .post('/shoppinglists/' + shoppingListTest._id + '/itens')
          .send(item)
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body.itens.length, 2);
            shoppingListTest = res.body;
            shoppingListItemTest = res.body.itens.find(e => e.title == '12 oranges');
            done();
          });
      });
    });

    describe('GET /shoppinglists/:id/itens/:itemId', function(){
      it('respond with 200 status code and an item from a shoppinglist', function(done){
        request
          .get('/shoppinglists/' + shoppingListTest._id + '/itens/' + shoppingListItemTest._id)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            should.equal(res.body._id, shoppingListItemTest._id);
            done();
          });
      });
    });

    describe('PUT /shoppinglists/:id/itens/:itemId', function(){
      it('respond with 200 status code and an shoppinglist updated', function(done){
        shoppingListItemTest.title = '1 orange';
        request
          .put('/shoppinglists/' + shoppingListTest._id + '/itens/' + shoppingListItemTest._id)
          .send(shoppingListItemTest)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res){
            should.equal(err, null);
            var itemUpdated = res.body.itens.find(e => e._id === shoppingListItemTest._id );
            should.equal(shoppingListItemTest.title, itemUpdated.title);
            shoppingListItemTest = itemUpdated;
            done();
          });
      });
    });

    describe('DELETE /shoppinglists/:id/itens/:itemId', function(){
      it('respond with 200 status code and a shoppinglist updated without the old item', function(done){
        request
          .delete('/shoppinglists/' + shoppingListTest._id + '/itens/' + shoppingListItemTest._id)
          .expect(200)
          .end(function (err, res){
            should.equal(err, null);
            var itemUpdated = res.body.itens.find(e => e._id === shoppingListItemTest._id );
            should.equal(null, itemUpdated);
            done();
          });
      });
    });
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

});

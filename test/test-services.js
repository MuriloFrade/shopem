var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    ShoppingListDbService = require('../services/shopping-list-db'),
    UserDbService = require('../services/user-db');

describe('services tests', function (){
  var userTest = null;
  before(function (done) {
    mongoose.connect('mongodb://localhost/shopping-list-tests', done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });
  // tests in  user-db service
  describe('user-db', function () {

    describe('#add', function () {
      it('should return a new user without erros', function (done) {
        var user = {
          username: 'userTest',
          email: 'test@test.com',
          password: 'foo',
        };
        UserDbService.add(user, function(err, result){
          should.equal(err, null);
          result.should.have.property('_id');
          userTest = result;
          done();
        });
      });
    });

    describe('#getByEmail', function () {
      it('should return an user without erros', function (done) {
        UserDbService.getByEmail(userTest.email, function(err, result){
          should.equal(err, null);
          result._id.equals(userTest._id).should.be.true();          
          should.equal(result.email, userTest.email);
          done();
        });
      });
    });

    describe('#update', function () {
      it('should update an user without erros', function (done) {
        var userOld = userTest;
        userOld.username = 'userTest2';
        userOld.email = 'test2@test.com';
        UserDbService.update(userTest, function(err, result){
          userTest = result;
          should.equal(err, null);
          should.equal(userOld.username, userTest.username);
          should.equal(userOld.email, userTest.email);
          done();
        });
      });
    });

    describe('#remove', function () {
      it('should remove an user without erros', function (done) {
        UserDbService.remove(user, function(err, result){
          should.equal(err, null);
          it('user should be null after delete', function(done){
            UserDbService.getByEmail(userTest.email, function(err, result){
              should.equal(err, null);
              should.equal(result, null);
              done();
            });
          });
          done();
        });
      });
    });

  }); // end user-db tests

  // tests in shopping-list-db service
  describe('shopping-list-db', function() {
    var currentShoppingList = null;
    before(function (done) {
      var user = {
        username: 'userTest',
        email: 'test@test.com',
        password: 'foo',
      };
      UserDbService.add(user, function (err, result){
        userTest = result ;
        done();
      });
    });

    after(function (done) {
      mongoose.disconnect(done);
    });

    describe('#add', function () {
      it('should return a new shoppingList without erros', function (done) {
        var sl = {
          title: 'titleTest',
          itens: [],
          _ownerId: userTest._id,
          _sharedWith: []
        };
        ShoppingListDbService.add(sl, function(err, result){
          should.equal(err, null);
          result.should.have.property('_id');
          done();
        });
      });
    });
    describe('#get', function () {
      it('should retrieve a shoppingList', function (done) {
        ShoppingListDbService.get(n, function(err, result){
          done();
        });
      });
    });
    describe('#update', function () {
      it('should update a shoppingList', function (done) {
        ShoppingListDbService.update(n, function(err, result){
          done();
        });

      });
    });

    describe('#remove', function () {
      it('should remove the shoppingList', function (done) {
        ShoppingListDbService.remove(n, function(err, result){
          done();
        });
      });
    });
  });  // end shopping-list-db tests

}); // end service-tests

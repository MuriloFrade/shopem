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

    describe('#get', function () {
      it('should return an user without erros', function (done) {

        UserDbService.get(user, function(err, result){
          should.equal(err, null);

          done();
        });
      });
    });

    describe('#update', function () {
      it('should update an user without erros', function (done) {

        UserDbService.update(user, function(err, result){
          should.equal(err, null);

          done();
        });
      });
    });

    describe('#remove', function () {
      it('should remove an user without erros', function (done) {

        UserDbService.remove(user, function(err, result){
          should.equal(err, null);

          done();
        });
      });
    });

  }); // end user-db tests

  // tests in shopping-list-db service
  describe('shopping-list-db', function() {
    var currentShoppingList = null;

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
        done();
      });
    });
    describe('#update', function () {
      it('should update a shoppingList', function (done) {
        done();
      });
    });

    describe('#remove', function () {
      it('should remove the shoppingList', function (done) {
        done();
      });
    });
  });  // end shopping-list-db tests

}); // end service-tests

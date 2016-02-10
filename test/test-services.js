var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    config = require('../config'),
    ShoppingListDbService = require('../services/shopping-list-db'),
    UserDbService = require('../services/user-db');

// delete all test data created in the database test during unit tests that failed
function cleanTestData(callback){
  UserDbService.getByUsername('usertest@test.com', function(err, result){
    if(result){
      UserDbService.remove(result, callback);
    }else{
      callback();
    }
  });
}

describe('services tests', function (){
  var userTest = null;
  before(function (done) {
    mongoose.connect(config.db.test, function(){
      cleanTestData(done);
    });
  });

  after(function (done) {
    mongoose.disconnect(done);
  });
  // tests in  user-db service
  describe('user-db', function () {

    describe('#add', function () {
      it('should return a new user without erros', function (done) {
        var user = {
          name: 'User Test',
          username: 'usertest@test.com',
          password: 'foo',
        };
        UserDbService.add(user, function(err, result){
          should.equal(err, null);
          result.should.have.property('_id');
          should.equal(result.name, user.name);
          should.equal(result.username, user.username);
          userTest = result;
          done();
        });
      });
    });

    describe('#getByUsername', function () {
      it('should return an user without erros', function (done) {
        UserDbService.getByUsername(userTest.username, function(err, result){
          should.equal(err, null);
          result._id.equals(userTest._id).should.be.true();
          should.equal(result.username, userTest.username);
          should.equal(result.name, userTest.name);
          done();
        });
      });
    });

    describe('#update', function () {
      it('should update an user', function (done) {
        //userTest.username = 'userTest2';
        userTest.username = 'test2@test.com';
        UserDbService.update(userTest, function(err, result){
          should.equal(err, null);
          //should.equal(userTest.username, result.username);
          should.equal(userTest.username, result.username);
          // get back to the original user
          userTest.username = 'userTest';
          UserDbService.update(userTest, function(err, result){
            done();
          });
        });
      });
    });

    describe('#remove', function () {
      it('should remove an user without erros', function (done) {
        UserDbService.remove(userTest._id, function(err, result){
          should.equal(err, null);
          should.equal(result, null);
          it('user should be null after delete', function(done){
            UserDbService.getByUsername(userTest.username, function(err, result){
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
        username: 'usertest@test.com',
        name: 'User Test',
        password: 'foo',
      };
      UserDbService.add(user, function (err, result){
        userTest = result ;
        done();
      });
    });

    after(function (done) {
      UserDbService.remove(userTest, function (){
        mongoose.disconnect(done);
      });
    });

    describe('#add', function () {
      it('should return a new shoppingList without erros', function (done) {
        var sl = {
          title: 'titleTest',
          color: '#FFFFFF',
          items: [],
          _ownerId: userTest._id,
          _sharedWith: []
        };
        ShoppingListDbService.add(sl, function(err, result){
          should.equal(err, null);
          result.should.have.property('_id');
          should.equal(result._ownerId, userTest._id);
          currentShoppingList = result;
          done();
        });
      });
    });
    describe('#get', function () {
      it('should retrieve a shoppingList', function (done) {
        ShoppingListDbService.get(currentShoppingList._id, function(err, result){
          should.equal(err, null);
          result._id.equals(currentShoppingList._id).should.be.true();
          done();
        });
      });
    });
    describe('#getAllFromUser', function () {
      it('should retrieve a collection of shoppingLists from user', function (done) {
        ShoppingListDbService.getAllFromUser(userTest._id, function(err, result){
          should.equal(err, null);
          done();
        });
      });
    });


    describe('#update', function () {
      it('should update a shoppingList', function (done) {
        currentShoppingList.title = 'testTitle2';
        ShoppingListDbService.update(currentShoppingList._id, currentShoppingList, function(err, result){
          should.equal(err, null);
          should.equal(currentShoppingList.title, result.title);
          done();
        });

      });
    });

    describe('#addItem', function () {
      it('should add an item to the shoppingList test', function (done) {
        var item = {
          title: '12 oranges',
          detail: 'Should prefer buy oranges from Brazil',
          wasPurchased: false,
        };
        ShoppingListDbService.addItem(currentShoppingList._id, item, function(err, item){
          should.equal(err, null);
          should.equal(item.title, item.title);
          currentShoppingList.items.push(item);
          done();
        });
      });
    });

    describe('#updateItem', function () {
      it('should update an item of the shoppingList', function (done) {
        var item = currentShoppingList.items[0];
        item.title = '10 apples';
        ShoppingListDbService.updateItem(currentShoppingList._id, item._id, item, function(err, itemUpdated){
          should.equal(err, null);
          should.equal(item.title, itemUpdated.title);
          done();
        });
      });
    });

    describe('#removeItem', function () {
      it('should remove an item from shoppingList', function (done) {
        var item = currentShoppingList.items[0];
        ShoppingListDbService.removeItem(currentShoppingList._id, item._id, function(err, shoppingList){
          should.equal(err, null);
          var itemIdex = shoppingList.items.findIndex(function (e) {
            if(e._id.equals(item._id)){
              return true;
            }
          });
          should.equal(itemIdex, -1);
          done();
        });
      });
    });

    describe('#remove', function () {
      it('should remove the shoppingList', function (done) {
        ShoppingListDbService.remove(currentShoppingList._id, function(err, result){
          should.equal(err, null);
          should.equal(result, null);
          done();
        });
      });
    });


  });  // end shopping-list-db tests

}); // end service-tests

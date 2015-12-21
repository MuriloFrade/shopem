var assert = require('assert'),
    should = require('should'),
    service = require('../../services/shopping-list-db');

describe('shopping-list-db', function() {
  describe('#add', function () {
    it('should return a new shoppingList without erros', function (done) {
      var sl = {
        title: 'title test',
        itens: [],
        _ownerId: 'AAAAA',
        _sharedWith: []
      };
      service.add(sl, function(err, result){
        assert.equal(null, err, 'err is not null');
        result.should.have.property('_id');
      });
    });
  });
  
  describe('#remove', function () {
    it('should remove the shoppingList created', function (done) {

    });
  });
});

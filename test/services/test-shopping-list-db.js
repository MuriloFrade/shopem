var assert = require('assert'),
    should = require('should'),
    service = require('../../services/shopping-list-db');

describe('shopping-list-db', function() {
  describe('#add', function () {
    it('should return a new shoppingList without erros', function (done) {
      var sl = {
        title: 'title test',
        itens: [],
        ownerId: 'AAAAA',
        sharedWith: []
      };
      service.add(sl, function(err, result){
        if (err) throw err;
        result.should.have.property('_id');
        done();
      });


    });
  });
});

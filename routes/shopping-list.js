/*jshint esnext: true */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Service = require('../services/shopping-list-db');
var utils = require('../utils');

function getShoppingListFromUser(req, res, callback){
  Service.get(req.params.id, function(err, shoppingList){
    var shoppingListItem = null;
    var error = false;
    if(err){
      error = true;
      res.status(500);
    }
    else if(!shoppingList){
      error = true;
      res.status(403);
    }
    else if(!shoppingList._ownerId.equals(req.user._id)){
      error = true;
      res.status(403);
    }
    // if the route has an id for an item of shopping list, get the item from it
    if(req.params.itemId){
      var itemId = req.params.itemId;
      var item = shoppingList.items.find(e => e._id.equals(itemId));
      if(!item){
        error = true;
        res.status(403);
      }else{
        shoppingListItem = item;
      }
    }
    callback(error, shoppingList, shoppingListItem);
  });
}

router.get('/', function(req, res, next) {
  var user = req.user;
  Service.getAllFromUser(user._id, function (err, results){
    if(err){
      return res.status(500).json({ error : err }); // Internal Server Error
    }
    res.json(results);
  });

});

//  POST new shoppinglist
router.post('/', function(req, res){
  var shoppingList = null;
  try {
    shoppingList = {
      title: req.body.title,
      color: req.body.color,
      _ownerId: req.user._id
    };
    utils.checkProperties(shoppingList);
  } catch (e) {
    return res.status(400).json({ error : e }); // Bad Request
  }
  Service.add(shoppingList, function(err, result){
    if(err) return res.sendStatus(500);
    res.status(201).json(result);
  });
});

// retrieve a shopping
router.get('/:id', function(req, res){
  var id = req.params.id;
  getShoppingListFromUser(req, res, function(err, shoppinglist){
    if(err) return res.send();
    res.status(200).json(shoppinglist);
  });
});

// update a shopping list
router.put('/:id', function (req, res){
  getShoppingListFromUser(req, res, function(err, shoppinglist){
    if(err)
      return res.send();

    Service.update(req.params.id, req.body, function(err, shoppinglist){
      if(err)
        return res.sendStatus(500);
      res.status(200).json(shoppinglist);
    });
  });
});
// delete a shopping list
router.delete('/:id', function (req, res){
  getShoppingListFromUser(req, res, function(err, shoppinglist){
    if(err) return res.send();
    Service.remove(shoppinglist._id, function(err){
      if(err)
        return res.sendStatus(500);
      res.sendStatus(200);
    });
  });
});

// ====== items of shopping list ======

// get all items from a shopping list
router.get('/:id/items', function (req, res){
  getShoppingListFromUser(req, res, function(err, shoppinglist){
    if(err) return res.send();

    res.status(200).json(shoppinglist.items);
  });
});

router.post('/:id/items', function(req, res){
  var item = null;
  try {
    item = {
      title: req.body.title,
      detail: req.body.detail || '',
      wasPurchased: false
    };
    utils.checkProperties(item);
  } catch (e) {
    return res.status(400).json({ error : e }); // Bad Request
  }
  getShoppingListFromUser(req, res, function(err, shoppinglist){
    if(err) return res.send();

    Service.addItem(shoppinglist._id, item, function(err, shoppinglist){
      if(err) return res.sendStatus(500);
      res.status(201).json(shoppinglist);
    });
  });
});

// // get an item
router.get('/:id/items/:itemId', function(req, res){
  getShoppingListFromUser(req, res, function(err, shoppinglist, item){
    if(err) return res.send();
    res.status(200).json(item);
  });

});

// update a shoppinglist's item
router.put('/:id/items/:itemId', function (req, res) {
  getShoppingListFromUser(req, res, function(err, shoppinglist, item){
    if(err) return res.send();
    try {
      utils.checkProperties({a: req.body.title, b: req.body.detail, c: req.body.wasPurchased});
    } catch (e) {
      return res.status(400).json({ error : e }); // Bad Request
    }
    item.title = req.body.title;
    item.detail = req.body.detail;
    item.wasPurchased = req.body.wasPurchased;

    Service.updateItem(shoppinglist._id, item._id, item, function(err, shoppingList){
      if(err)
        return res.sendStatus(500);

      res.status(200).json(shoppinglist);
    });
  });
});

// // remove an item
router.delete('/:id/items/:itemId', function(req, res){
  getShoppingListFromUser(req, res, function(err, shoppinglist, item){
    if(err) return res.send();
    Service.removeItem(shoppinglist._id, item._id, function(err, shoppingList){
      if(err)
        return res.sendStatus(500);
      res.status(200).json(shoppingList);
    });
  });

});

module.exports = router;

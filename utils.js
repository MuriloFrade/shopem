function checkProperties (obj) {
  for (var prop in obj) {
    if (obj[prop] !== undefined) continue;
    else throw new ReferenceError('The property ' + prop +
        ' is not defined on this object');
  }
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
      var isAjaxRequest = req.xhr;
      if(isAjaxRequest){
        res.send(401, {
            error: "Unauthorized"
        });
      }else{
        res.redirect('/login');
      }

    }
}

module.exports = {
  checkProperties: checkProperties ,
  loggedIn: loggedIn,
};

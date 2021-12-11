'use strict';
 
var server = require('server');


server.get('ShowProduct', server.middleware.include, function (req, res, next) {
     var ProductMgr = require('dw/web.ProductMgr');
     
     res.render("training/vartest", { myvariable: ProductMgr });
 
    return next();
});
 
 
module.exports = server.exports();

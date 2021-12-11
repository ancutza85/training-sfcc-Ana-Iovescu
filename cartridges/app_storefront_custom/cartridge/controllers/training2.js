'use strict';
 
var server = require('server');
 
server.get('Basket', function (req, res, next) {
    var BasketMgr = require("dw/order/BasketMgr");
 
    var currentBasket = BasketMgr.getCurrentBasket();
 
    res.render("training/showbasket");
    return next();
});
 
module.exports = server.exports();

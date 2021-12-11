'use strict';
 
var server = require('server');
 
 
server.get('Test', function (req, res, next) {
    var myvariable ='${session.custom.sessionVar}';
    res.render("/training/vartest", myvariable);
    return next();
});

server.get('RenderTemplate ', function (req, res, next) {
    res.render("/training/dummytemplate", dummy);
    return next();
});
 
server.get('TestRemoteInclude', function (req, res, next) {
    res.render("/training/dummytemplate2");
    return next(); 
});

server.get('TestDecorator', function (req, res, next) {
    res.render("/training/decorate");
    return next();
});
module.exports = server.exports();

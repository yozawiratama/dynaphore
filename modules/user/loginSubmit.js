function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({isSuccess : true}));
}

module.exports = function (module_holder, moduleid) {
    module_holder[moduleid]['user.login.submit'] = handler;
};
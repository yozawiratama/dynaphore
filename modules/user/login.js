function handler(req, res) {
    console.log('Entered login!');
}

module.exports = function(module_holder) {
    // the key in this dictionary can be whatever you want
    // just make sure it won't override other modules
    module_holder['login'] = handler;
};
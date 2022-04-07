const errorController = require('../controllers/errorsCtrls');

module.exports = function (app) {
    app.all('*', errorController.pageNotFound);
    app.use(errorController.allErrors);
};
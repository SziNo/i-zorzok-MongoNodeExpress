const expressError = require('../utils/ExpressError');

module.exports.pageNotFound = (req, res, next) => {
  next(new expressError('Page Not Found', 404));
};

module.exports.allErrors = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  if (err.message.includes('Cast to ObjectId failed')) {
    req.flash('error', 'Érvénytelen ID keresés!');
    return res.redirect('/iDrinks');
  }

  if (err.message.includes('Invalid regular expression')) {
    req.flash('error', 'Érvénytelen keresés');
    return res.redirect('/iDrinks');
  }
  return res.status(err.statusCode).render('error', { err });
};

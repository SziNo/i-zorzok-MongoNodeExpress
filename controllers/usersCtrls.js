const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ username, email });
    // Register with the username of admin to become an admin
    if (req.body.username === 'admin') {
      user.isAdmin = true;
    }
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', 'Üdvözlünk az oldalon!');
      res.redirect('/iDrinks');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Isten hozott!');
  const redirectUrl = req.session.returnTo || '/iDrinks';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Isten veled!');
  res.redirect('/iDrinks');
};

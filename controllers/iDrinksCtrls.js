const IDrink = require('../models/iDrink');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({ accessToken: MapBoxToken });
const { cloudinary } = require('../configs/cloudinarySetup');

module.exports.index = async (req, res) => {
  const iDrinks = await IDrink.find({});
  res.render('iDrinks/index', { iDrinks });
};

module.exports.renderNewForm = (req, res) => {
  res.render('iDrinks/new');
};

module.exports.createIDrink = async (req, res, next) => {
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.iDrink.location,
      limit: 1,
    })
    .send();
  const iDrink = new IDrink(req.body.iDrink);
  iDrink.geometry = geoData.body.features[0].geometry;
  iDrink.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  iDrink.author = req.user._id;
  await iDrink.save();
  req.flash('success', 'Hirdetésedet sikeresen létrehoztad!');
  res.redirect(`/iDrinks/${iDrink._id}`);
};

module.exports.showIDrink = async (req, res) => {
  const iDrink = await IDrink.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('author');
  if (!iDrink) {
    req.flash('error', 'Nincs ilyen hirdetés!');
    return res.redirect('/iDrinks');
  }
  res.render('iDrinks/show', { iDrink });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const iDrink = await IDrink.findById(id);
  if (!iDrink) {
    req.flash('error', 'Nincs ilyen hirdetés!');
    return res.redirect('/iDrinks');
  }
  res.render('iDrinks/edit', { iDrink });
};

module.exports.updateIDrink = async (req, res) => {
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.iDrink.location,
      limit: 1,
    })
    .send();
  const { id } = req.params;
  const iDrink = await IDrink.findByIdAndUpdate(id, { ...req.body.iDrink });
  iDrink.geometry = geoData.body.features[0].geometry;
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  iDrink.images.push(...imgs);
  await iDrink.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await iDrink.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash('success', 'Hirdetésedet sikeresen frissítetted!');
  res.redirect(`/iDrinks/${iDrink._id}`);
};

module.exports.deleteIDrink = async (req, res) => {
  const { id } = req.params;
  await IDrink.findByIdAndDelete(id);
  req.flash('success', 'Hirdetésedet sikeresen törölted!');
  res.redirect('/iDrinks');
};

const Gymground = require("../models/gymground");
const { cloudinary } = require('../cloudinary/index')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })


module.exports.index = async (req, res) => {
    const gymgrounds = await Gymground.find({}).sort({ _id: -1 });
    res.render("gymgrounds/index", { gymgrounds });
};

module.exports.newForm = (req, res) => {
    res.render("gymgrounds/new");
};

module.exports.create = async (req, res, next) => {
    const geodata = await geocoder.forwardGeocode({
        query: req.body.gymground.location,
        limit: 1,
    }).send();

    const newGymground = new Gymground(req.body.gymground);
    newGymground.geometry = geodata.body.features[0].geometry;
    newGymground.images = req.files.map(file => ({ url: file.path, filename: file.filename }));
    newGymground.author = req.user._id;
    await newGymground.save();

    req.flash("success", "Successfully created a gym location!");
    res.redirect(`/gymgrounds/${newGymground._id}`);
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const gymground = await Gymground.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("author");
    res.render("gymgrounds/show", { gymground });
};

module.exports.editForm = async (req, res) => {
    const { id } = req.params;
    const gymground = await Gymground.findById(id);
    res.render("gymgrounds/edit", { gymground });
};

module.exports.update = async (req, res, next) => {
    const geodata = await geocoder.forwardGeocode({
        query: req.body.gymground.location,
        limit: 1,
    }).send();

    const { id } = req.params;
    const gymground = await Gymground.findByIdAndUpdate(id, req.body.gymground);
    Gymground.geometry = geodata.body.features[0].geometry;
    const img = req.files.map(file => ({ url: file.path, filename: file.filename }));
    gymground.images.push(...img)
    await gymground.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await gymground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    req.flash("success", "Successfully updated Gym Location!");
    res.redirect(`/gymgrounds/${gymground._id}`);
};

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Gymground.findByIdAndDelete(id);
    req.flash("success", "Succesfullt deleted gym location!");
    res.redirect("/gymgrounds");
};

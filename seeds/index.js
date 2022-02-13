const mongoose = require("mongoose");
const Gymground = require("../models/gymground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/fitnessPro"),
{
    useNewUrlParse: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const price = Math.floor(Math.random() * 20) + 10;

const seedDB = async () => {
    await Gymground.deleteMany({});
    for (i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const newGymground = await new Gymground({
            author: "62014a35dbfee14e4a611ac8",
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhb8qzhag/image/upload/v1644398740/fitnessPro/depndc2fy5obvdf5uqsv.jpg',
                    filename: 'fitnessPro/depndc2fy5obvdf5uqsv',
                },
                {
                    url: 'https://res.cloudinary.com/dhb8qzhag/image/upload/v1644398741/fitnessPro/qjaoh7329hohzmrff650.jpg',
                    filename: 'fitnessPro/qjaoh7329hohzmrff650',
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit suscipit asperiores harum nobis rem nesciunt, dolorum dolorem architecto consectetur nihil veritatis dicta amet culpa at neque? Facere vitae provident enim.",
            price,
        });
        await newGymground.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
});

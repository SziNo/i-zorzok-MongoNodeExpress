const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const IDrink = require('../models/iDrink');

//const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/i-Drink';
mongoose.connect('mongodb://localhost:27017/i-Drink');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database Connected!!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await IDrink.deleteMany({});
    for (let i = 0; i < 7; i++) {
        const random20 = Math.floor(Math.random() * 20);
        const price = Math.floor(Math.random() * 4000) + 2000;
        const drink = new IDrink({
            // SziNo USER ID 
            //While seeding the mongo atlas, remember that you have to change the author id. To do that copy and paste the id of the privileged user you have created in mongo atlas 
            author: "61ffeaa16dc966e9cccc4a43",
            location: `${cities[random20].city}, ${cities[random20].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random20].longitude,
                    cities[random20].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dc0nkgrxz/image/upload/v1644165181/ProjectPictures/idrinkseed1_zfeewt.jpg',
                    filename: 'ProjectPictures/idrinkseed1_zfeewt',
                },
                {
                    url: 'https://res.cloudinary.com/dc0nkgrxz/image/upload/v1644165182/ProjectPictures/idrinkseed2_dv11pk.jpg',
                    filename: 'ProjectPictures/idrinkseed2_dv11pk',
                }
            ]
        })
        await drink.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/greenCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 406);
        const price = Math.floor(Math.random() * 1500) + 200;
        const camp = new Campground({
            author: '61a20313db3b686e0d4daf69',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
            geometry: {
                type: 'Point',
                coordinates : [
                    parseFloat(cities[random1000].lng),
                    parseFloat(cities[random1000].lat)
                ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim tempore corporis eligendi ipsum ipsa officia perspiciatis tenetur.',
            images: [
                {
                    url: 'https://res.cloudinary.com/greencamp/image/upload/v1638242012/GreenCamp/kmzzwsspvznbu2oe79r6.jpg',
                    filename: 'GreenCamp/kmzzwsspvznbu2oe79r6',
                },
                {
                    url: 'https://res.cloudinary.com/greencamp/image/upload/v1638242014/GreenCamp/nwm0rvpnxynpusxynqy9.jpg',
                    filename: 'GreenCamp/nwm0rvpnxynpusxynqy9',
                }
            ],
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

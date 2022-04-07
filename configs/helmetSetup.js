const helmet = require('helmet');

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`
];
const connectSrcUrls = [
    "https://*.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`
];
const fontSrcUrls = [`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`];

module.exports = app => {
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: [],
                    connectSrc: ["'self'", ...connectSrcUrls],
                    scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
                    styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                    workerSrc: ["'self'", "blob:"],
                    objectSrc: [],
                    imgSrc: [
                        "'self'",
                        "blob:",
                        "data:",
                        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
                        "https://images.unsplash.com/"
                    ],
                    fontSrc: ["'self'", ...fontSrcUrls],
                    mediaSrc: [`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`],
                    childSrc: ["blob:"]
                }
            },
            crossOriginEmbedderPolicy: false
        })
    )
};
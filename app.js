if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

const mongoSanitize = require('express-mongo-sanitize'); //Security feature for that people cant inject mongo database queries.

const gymgroundRoute = require("./routes/gymground");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");

/*========================DATABASE CONNECTION=========================*/
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl), //"mongodb://localhost:27017/fitnessPro"
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
/*=================================================================*/

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret: process.env.SECRET, //'thisshouldbebettersecret' process.env.secret coming fro heroku
    touchAfter: 24 * 60 * 60,
});
store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e)
});
const sessionConfig = {
    store,
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //With this cookies can be only accessible using http.(Javascript wont work) 
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
app.use(flash());

/*------------------------------------------Helmet middleware------------------------------------------*/
app.use(helmet({ crossOriginEmbedderPolicy: false, }));
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
//This is the array that needs added to
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
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
                "https://res.cloudinary.com/dhb8qzhag/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
/*---------------------------------------------------------------------------------------------------*/

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoute);
app.use("/gymgrounds", gymgroundRoute);
app.use("/gymgrounds/:id/reviews", reviewRoute);

app.use('/', (req, res) => {
    res.render('home');
})

app.get("*", (req, res, next) => {
    throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Something went wrong!!!";
    res.status(status).render("error", { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

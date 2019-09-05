// require modules
require(`dotenv`).config();
const express = require(`express`);
const methodOveride = require(`method-override`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const sessionMiddleware = require(`./app/middlewares/session`);
const path = require(`path`);

const app = express();
const port = 8000;

// require routes
const indexRoute = require(`./app/routes/index`);
const authRoute = require(`./app/routes/auth`);
const userRoute = require(`./app/routes/user`);
const adminRoute = require(`./app/routes/admin`);
const searchRoute = require(`./app/routes/search`);
const itemUpdateRoute = require(`./app/routes/itemsUpdate`);
const itemRoute = require(`./app/routes/items`);
const allAnimeRoute = require(`./app/routes/allAnime`);

// set template engine to using
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

// using body-parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// using cookie-parser to save sessions login user
app.use(cookieParser(process.env.SESSION_SECRET));

// auto create sessionId
app.use(sessionMiddleware);

// using method-override
// override with the X-HTTP-Method-Override header in the request
app.use(methodOveride(`_method`));

// using static files
app.use(express.static(path.join(__dirname, `public`)));

// using routes file
app.use(`/`, indexRoute);
app.use(`/auth`, authRoute);
app.use(`/user`, userRoute);
app.use(`/admin`, adminRoute);
app.use(`/search`, searchRoute);
app.use(`/itemsUpdate`, itemUpdateRoute);
app.use(`/items`, itemRoute);
app.use(`/allAnime`, allAnimeRoute);
app.use(`*`, function (req, res, next) {
    res.status(404).end();
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // when status is 404, error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     if (404 === err.status) {
//         res.format({
//             'text/plain': () => {
//                 res.send({
//                     message: 'not found Data'
//                 });
//             },
//             'text/html': () => {
//                 res.render('404.pug');
//             },
//             'application/json': () => {
//                 res.send({
//                     message: 'not found Data'
//                 });
//             },
//             'default': () => {
//                 res.status(406).send('Not Acceptable');
//             }
//         })
//     }

//     // when status is 500, error handler
//     if (500 === err.status) {
//         return res.send({
//             message: 'error occur'
//         });
//     }
// });
// listening on port
app.listen(port, () => console.log(`App listening on port, ` + port));
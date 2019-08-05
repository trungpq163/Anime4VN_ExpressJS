// require modules
const express = require(`express`);
const bodyParser = require(`body-parser`);
const path = require(`path`);

const app = express();
const port = 3000;

// require routes
const indexRoute = require(`./app/routes/index`);
const authRoute = require(`./app/routes/auth`);
const userRoute = require(`./app/routes/user`);

// set template engine to using
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

// using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// using static files
app.use(express.static(path.join(__dirname, `public`)));

// using routes file
app.use(`/`, indexRoute);
app.use(`/auth`, authRoute);
app.use(`/user`, userRoute);

// listening on port
app.listen(port, () => console.log(`App listening on port, ` + port));
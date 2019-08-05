// require and define
const express = require(`express`);
const path = require(`path`);
const app = express();
const port = 3000;
const indexRoute = require(`./app/routes/index`);

// set template engine to using
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

// using static files
app.use(express.static(path.join(__dirname, `public`)));

// using routes file
app.use(`/`, indexRoute);

// listening on port
app.listen(port, () => console.log(`App listening on port, ` + port));
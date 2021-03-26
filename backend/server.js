
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

const cardRoute = require('./routes/card.route');
//const {createError} = require("@typescript-eslint/typescript-estree/dist/node-utils");


mongoose.Promise = global.Promise;
mongoose
    .connect(dbConfig.db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
            console.log("Connected to DB.")
        },
        error => {
            console.log('Could not connect to DB:' + error)
        });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend: true
}));
app.use(cors());
app.use('/cards', cardRoute);

const port = 4000;
const server = app.listen(port, () => {
    console.log('Connected on port:', port)
});

// 404 error
app.use((req, res, next) => {
   next(createError(404));
});

app.use((err, req, res, next) => {
    console.error(err.message); // should be err.message ??
    if (!err.statusCode) err.statusCode = 500;
   res.status(err.statusCode).send(err.message);

})
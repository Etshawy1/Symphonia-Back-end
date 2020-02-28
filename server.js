// jshint esversion:8
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connection successful!');
    })
    .catch(err => {
        console.log(err.message);
        const DBLocal = process.env.DATABASE_LOCAL;
        mongoose
            .connect(DBLocal, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }).then(() => {
                console.log("DB connection successful! local");
            }).catch(er => {
                console.log(er.message);
                process.exit(); /*an agresive why to stop the pplication */
            });
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
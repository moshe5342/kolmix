const mongoose = require('mongoose');
const { config } = require('../config/secret');

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${config.dbUserName}:${config.dbPassword}@cluster0.hmi3hpq.mongodb.net/kolmix`);
    console.log('mongo connect!!');
}
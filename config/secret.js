require('dotenv').config();

exports.config = {
    tokenSecret: process.env.TOKEN_SECRET,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
}
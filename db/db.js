
var mysql = require('mysql'),
settings = require('./config');
var connection = mysql.createConnection({
host : settings.mysql.host,
// port : settings.port,
database : settings.mysql.database,
user : settings.mysql.user,
password : settings.mysql.password
});
connection.connect();
module.exports = connection;


const mysql = require('mysql')
const { promisify } = require('util')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root128',
    password: '3898221a',
    database: 'my_db_01'
})

queryByPromisify = promisify(db.query).bind(db)

db.queryByPromisify = queryByPromisify

module.exports = db
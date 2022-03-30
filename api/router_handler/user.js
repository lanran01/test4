const db = require('../../db/index')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const config = require('../../confg')

const dbQuery = promisify(db.query).bind(db)

exports.reguser = async(req, res) => {
    const userinfo = req.body

    const sqlStr = 'select * from en_users where username = ?'

    try {
        const data = await dbQuery(sqlStr, userinfo.username)
        if (data.length > 0) {
            return res.cc('user name exists')
        }
    } catch (e) {
        return res.cc(e)
    }

    const sqlInsert = 'insert into en_users set ?'

    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    try {
        const data = await dbQuery(sqlInsert, { username: userinfo.username, password: userinfo.password })

        if (data.affectedRows !== 1) {
            return res.cc('register failure')
        }

        res.cc('register success', 0)

    } catch (e) {
        return res.cc(e)
    }
}

// login handler
exports.login = async(req, res) => {
    const userinfo = req.body

    const sqlStr = 'select * from en_users where username = ?'

    let result = [];
    try {
        result = await dbQuery(sqlStr, userinfo.username)
        if (result.length !== 1) {
            return res.cc('login failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)

    if (!compareResult) {
        return res.cc('login failure')
    }

    const user = {...result[0], password: null, user_pic: null }

    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    res.send({
        status: 0,
        message: 'login success',
        token: 'Bearer ' + tokenStr
    })
}
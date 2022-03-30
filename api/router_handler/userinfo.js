const db = require('../../db/index')

const bcrypt = require('bcryptjs')

exports.getUserInfo = async(req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from en_users where id = ?'

    let results = []
    try {
        results = await db.queryByPromisify(sql, req.user.id)

        if (results.length !== 1) {
            return res.cc('acquire user information failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'acquire user information success',
        data: results[0]
    })
}

exports.updateUserInfo = async(req, res) => {
    const sql = 'update en_users set ? where id = ?'

    try {
        const result = await db.queryByPromisify(sql, [req.body, req.body.id])

        if (result.affectedRows !== 1) {
            return res.cc('update user information failure')
        }

    } catch (e) {
        res.cc(e)
    }

    res.cc('update user information success', 0)
}

exports.updatePwd = async(req, res) => {
    const sql = 'select * from  en_users where id = ?'

    let results = []
    try {
        results = await db.queryByPromisify(sql, req.user.id)

        if (results.length !== 1) {
            return res.cc('reset password failure')
        }
    } catch (e) {
        return res.cc('reset password failure')
    }

    const oldPwdStored = results[0].password

    const compareResult = bcrypt.compareSync(req.body.oldPwd, oldPwdStored)

    if (!compareResult) {
        return res.cc('old password wrong')
    }

    const newPwdEncrypted = bcrypt.hashSync(req.body.newPwd, 10)

    const sqlUpdate = 'update en_users set password = ? where id = ?'

    let resultUpdate = []
    try {
        resultUpdate = await db.queryByPromisify(sqlUpdate, [newPwdEncrypted, req.user.id])

        if (resultUpdate.affectedRows !== 1) {
            return res.cc('reset password failure')
        }
    } catch (error) {
        return res.cc('reset password failure')
    }

    res.send({
        status: 0,
        msg: 'reset password success'
    })
}
exports.updateAvatar = async(req, res) => {
    const sql = 'update en_users set user_pic = ? where id = ?'

    let result = null
    try {
        result = await db.queryByPromisify(sql, [req.body.avatar, req.user.id])

        if (result.affectedRows !== 1) {
            return res.cc('update user photo failure')
        }
    } catch (e) {
        return res.cc('update user photo failure')
    }

    res.send({
        status: 0,
        msg: 'update user photo success'
    })
}
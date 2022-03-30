const db = require('../../db/index')

// acquire article categorys
exports.getArticleCates = async(req, res) => {
    const sql = 'select * from en_article_cate where is_delete = 0 order by id asc'

    let results = []
    try {
        results = await db.queryByPromisify(sql)
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article categorys acquired success',
        data: results
    })
}

// add article categorys
exports.addArticleCates = async(req, res) => {
    const sql = 'select * from en_article_cate where name = ? or alias = ?'

    let results = []
    try {
        results = await db.queryByPromisify(sql, [req.body.name, req.body.alias])

        if (results.length === 1) { 

            if (results[0].alias == req.body.alias && results[0].name == req.body.name) {
                return res.cc('category name and category alias have been used')
            }

            if (results[0].name == req.body.name) {
                return res.cc('category name  has been used')
            }

            if (results[0].alias == req.body.alias) {
                return res.cc('category alia  has been used')
            }
        }

        if (results.length === 2) { // name，alias分别被两条数据占用
            return res.cc('category name and category alias have been used')
        }

    } catch (e) {
        return res.cc(e)
    }

    const sqlInsert = 'insert into en_article_cate set ?'

    let resultInsert = null
    try {
        resultInsert = await db.queryByPromisify(sqlInsert, req.body)

        if (resultInsert.affectedRows !== 1) {
            return res.cc('article category add failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article category add success'
    })
}

// delete article category by id
exports.deleteArticleById = async(req, res) => {
    const sql = 'delete from en_article_cate where id = ?'

    let result = null
    try {
        result = await db.queryByPromisify(sql, req.params.id)

        if (result.affectedRows !== 1) {
            return res.cc('article category delete failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article category delete success'
    })
}

// acquire article category by id
exports.getArticleCateById = async(req, res) => {
    const sql = 'select * from en_article_cate where id = ?'

    let result = []
    try {
        result = await db.queryByPromisify(sql, req.params.id)

        if (result.length !== 1) {
            return res.cc('article category does not exist')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article category acquire success',
        data: result[0]
    })
}

//update article category
exports.updateCateById = async(req, res) => {
    const sql = 'select * from en_article_cate where id != ? and (name = ? or alias = ?)'

    let results = []
    try {
        results = await db.queryByPromisify(sql, [req.body.id, req.body.name, req.body.alias])

        if (results.length === 1) {
            if (results[0].name == req.body.name && results[0].alias == req.body.alias) {
                return res.cc('category name and alia have been used')
            }

            if (results[0].name == req.body.name) {
                return res.cc('category name has been used')
            }

            if (results[0].alias == req.body.alias) {
                return res.cc('category alia has been used')
            }
        }

        if (results.length === 2) {
            return res.cc('category name and alia have been used')
        }
    } catch (e) {
        res.cc(e)
    }

    const sqlUpdate = 'update en_article_cate set ? where id = ?'

    let result = null
    try {
        result = await db.queryByPromisify(sqlUpdate, [req.body, req.body.id])

        if (result.affectedRows !== 1) {
            return res.cc('article category update failure')
        }
    } catch (e) {
        console.log(e);
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article category update success'
    })
}
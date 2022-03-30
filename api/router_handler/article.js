const db = require('../../db/index')
const path = require('path')

exports.addArticle = async(req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('you have to choose a article cover')
    }

    const articleinfo = {
        ...req.body,
        pub_date: new Date(),
        author_id: req.user.id,
        cover_img: path.join('/uploads', req.file.filename)
    }

    const sql = 'insert into en_articles set ?'

    let result = null
    try {
        result = await db.queryByPromisify(sql, articleinfo)

        if (result.affectedRows !== 1) {
            return res.cc('article created failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'article created success'
    })
}

exports.listArticle = async(req, res) => {
    const sql = `select a.id, a.title, a.pub_date, a.state, b.name as cate_name
                from en_articles as a,en_article_cate as b 
                where a.cate_id = b.id and a.cate_id = ifnull(?, a.cate_id)  and a.state = ifnull(?, a.state) and a.is_delete = 0  limit ?,?`

    let results = []
    try {
        results = await db.queryByPromisify(sql, [req.query.cate_id || null, req.query.state || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize])
    } catch (e) {
        return res.cc(e)
    }

    const countSql = 'select * from en_articles where is_delete = 0'
    let total = null
    try {
        total = await db.queryByPromisify(countSql)
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg:'acquire article list success',
        data: results,
        total: total.length
    })

}



exports.delArticle = async(req, res) => {
    const sql = 'delete from en_articles where id = ?'

    try {
        let result = await db.queryByPromisify(sql, req.params.id)

        if (result.affectedRows !== 1) {
            return res.cc('delete article failure')
        }
    } catch (e) {
        res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'delete article success'
    })
}

exports.editArticle = async(req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('you have to choose a article cover')
    }

    const sql = 'update en_articles set ? where id = ?'

    const articleinfo = {
        ...req.body,
        pub_date: new Date(),
        cover_img: path.join('/uploads', req.file.filename)
    }

    try {
        let result = await db.queryByPromisify(sql, [articleinfo, req.body.id])
        if (result.affectedRows !== 1) {
            res.cc('update article failure')
        }
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'update article success'
    })
}



exports.queryArticleDetail = async(req, res) => {
    const sql = 'select  * from en_articles where id = ?'

    let result = []
    try {
        result = await db.queryByPromisify(sql, req.params.id)
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'query article success',
        data: result[0]
    })
}

exports.ArticleDetail = async(req, res) => {
    const sql = 'select  content from en_articles where id = ?'

    let result = []
    try {
        result = await db.queryByPromisify(sql, req.params.id)
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: 'query article detail success',
        data: result[0]
    })
}
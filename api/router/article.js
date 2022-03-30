const express = require('express')

const router = express.Router()

const { addArticle, listArticle, delArticle, editArticle, queryArticleDetail,ArticleDetail } = require('../router_handler/article')

// form data validation rule
const expressJOI = require('@escook/express-joi')
const { add_article_schema, list_article_schema, del_article_schema, eidt_article_schema,detail_article_schema } = require('../schema/article')

// parse form-data data
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// router
router.post('/add', upload.single('cover_img'), expressJOI(add_article_schema), addArticle)
router.get('/list', expressJOI(list_article_schema), listArticle)
router.get('/delete/:id', expressJOI(del_article_schema), delArticle)
router.post('/edit', upload.single('cover_img'), expressJOI(eidt_article_schema), editArticle)
router.get('/:id', expressJOI(del_article_schema), queryArticleDetail)
router.get('/:id/detail', expressJOI(detail_article_schema), ArticleDetail)

module.exports = router
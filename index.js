const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use('/uploads', express.static('./uploads'))
app.use(express.static('./client'))

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

const expressJWT = require('express-jwt')
const config = require('./confg')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

const userRouter = require('./api/router/user')
app.use('/api', userRouter)

const userinfoRouter = require('./api/router/userinfo')
app.use('/my', userinfoRouter)

const artCateRouter = require('./api/router/artcate')
app.use('/my/article', artCateRouter)

const articleRouter = require('./api/router/article')
app.use('/my/article', articleRouter)

const joi = require('joi')
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name == 'UnauthorizedError') {
        return res.cc('identify id failure')
    }
    res.cc(err)
})

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})
'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js';
import categoriesRoutes from '../src/categories/category.routes.js'
import commentRoutes from '../src/comments/comment.routes.js'
import publicationRoutes from '../src/publication/publication.router.js'
import defaultRoutes from '../src/users/default.controller.js'
import {limiter} from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes =(app)=>{
    app.use('/v1/auth',authRoutes)
    app.use('/v1/user',userRoutes)
    app.use('/v1/category',categoriesRoutes)
    app.use('/v1/comment',commentRoutes)
    app.use('/v1/publication',publicationRoutes)
}

export const initServer =async ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        await defaultRoutes()
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (error) {
        console.log('server init faild',error)
    }
}
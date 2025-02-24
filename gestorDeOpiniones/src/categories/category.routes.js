import { Router } from "express";

import{saveCategory,getAllCategories,updateCategory,deleteCategory}from './category.cotroller.js'
import{validateJwt, isAdmin}from '../../middlewares/validate.jwt.js'
const api = Router()

api.post('/saveCategory',[validateJwt,isAdmin],saveCategory)
api.get('/getAllCategories',[validateJwt,isAdmin],getAllCategories)
api.put('/updateCategory/:id',[validateJwt,isAdmin],updateCategory)
api.delete('/deleteCategory/:id',[validateJwt,isAdmin],deleteCategory)

export default api
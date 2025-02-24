import { Router } from "express";
import { addComment, updateComment,deleteComment } from "../comments/comment.cotroller.js";
import{validateJwt}from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addComment/:publicationId',validateJwt,addComment)
api.put('/updateComment/:id',validateJwt,updateComment)
api.delete('/deleteComment/:id',validateJwt,deleteComment)

export default api
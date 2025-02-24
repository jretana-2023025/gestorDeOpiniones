import {Router} from "express"

import { addPublication,updatePublication,deletePublication } from "./publication.controller.js"

import {validateJwt} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addPublication',validateJwt, addPublication)
api.put('/updatePublication/:id',validateJwt, updatePublication)
api.delete('/deletePublication/:id',validateJwt, deletePublication)

export default api
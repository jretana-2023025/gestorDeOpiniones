import {Router} from "express"
import { 
        getAll,
        getOne,
        updateUser,
        updatePassword
        } from '../users/user.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator,registerValidator } from "../../middlewares/validators.js"

const api = Router()



    api.get('/getAll',getAll)
    //api.get('/getOne',getOne)
    api.put('/updateUser/:id',[validateJwt,updateUserValidator],updateUser)
    api.put('/updatePassword/:id',[validateJwt,updateUserValidator],updatePassword)

    export default api       
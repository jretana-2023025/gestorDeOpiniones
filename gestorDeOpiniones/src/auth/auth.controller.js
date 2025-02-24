import User from '../users/user.model.js'
import { checkPassword,encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'


export const register = async (req,res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'PROFILE_USER'
        
        await user.save()
        return res.send({message:`Registered succesfully, can be login with username: ${user.username}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'general error with addUser'})
    }
}

export const login = async (req, res) => {
    try{
        //Capturar los datos(body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfunción OR | espera un [] de busquedas
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) //{username} = {username: username}
        console.log(user)
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}

import User from './user.model.js'
import {checkPassword, encrypt } from '../../utils/encrypt.js'
import {generateJwt} from '../../utils/jwt.js'
import argon from 'argon2'




export const getAll = async (req,res) => {
    try {
        const { limit = 20, skip=0}=req.query
        const users = await User.find()
        .skip(skip)
        .limit(limit)

        if(users.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'users not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'users found:',
                users
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error getAll',error})
    }

}

export const getOne = async (req,res) => {
    try {
        let { id } = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ', 
                user
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error with getOne',error})
    }
}

export const updateUser =async (req, res) => {
    try {
        const {id}= req.params
        const data= req.body
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!update) return res.status(404).send(
            {
                success:false,
                message:'User not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'User updated',
                user:update
            }
        )
    } catch (error) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }    
}

export const updatePassword = async(req, res)=>{
    try{
        let id = req.user.uid

        let {oldPassword, newPassword} = req.body

        let user = await User.findById(id)
        
        if(user && await checkPassword(user.password, oldPassword)){
            user.password = await encrypt(newPassword)
            user.save()
            return res.send(
                {
                    success: true,
                    message:'Updated Password Successfully'
                }
            )
        }
        return res.send(
            {
                success: false, 
                message:'Error Uptades Password'
            }
        )

    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message:'General error'
            }
        )
    }
}


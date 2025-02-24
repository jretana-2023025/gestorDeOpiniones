import User from '../users/user.model.js'
import Category from '../categories/category.model.js'
import { encrypt } from '../../utils/encrypt.js'


export const adminDefect = async () => {
    try {
        let defectAdmin = await User.findOne({role:'ADMIN'})
        if(!defectAdmin){
            const password = await encrypt('123Aa@',10)
            let adminD= new User({
                name: 'David',
                surname:'Retana',
                username:'DRETANA',
                email:'dretana123@gmail.com',
                password: password,
                phone:'74125802',
                role:'ADMIN'
            })
            await adminD.save()
            console.log( `Admin is already connected`)
        }else{
            console.log('Admin already exists')
        }
        
    } catch (error) {
        console.error('general error with adminDefect',error )
        
    }
   
}

const initCategory =async () => {
    try {
        const categories = await Category.countDocuments()
        if(categories===0){
            const categoriesDefault=[
                {
                    name:'Default',
                    description:'Default category'
                }
            ]
            await Category.insertMany(categoriesDefault)
            console.log('Default categories inserted')
        }else{
            console.log('Category already exists')
        }
          
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'general error with adminDefect',error})   
    }
}

const initDataBase = async () => {
    await adminDefect()
    await initCategory()
}

export default initDataBase
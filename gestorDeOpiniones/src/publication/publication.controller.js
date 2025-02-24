import Publication from'../publication/publication.model.js'
import Category from '../categories/category.model.js'
import User from'../users/user.model.js'
import Comment from '../comments/comment.model.js'

export const addPublication = async (req,res) => {
    try {
        const data = req.body
        const id = req.user.uid

        let categoryId = await Category.findById(data.category)
        if(!categoryId){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        let publication = new Publication(data)

        publication.user = id

        await publication.save()
        await publication.populate('category')
       
        return res.status(201).send(
            {
                success:true,
                message:'publication created successfully',
                publication
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with addPublication',
                error
            }
        )
    }
}

export const updatePublication = async (req,res) => {
    try {
        let {id} =req.params
        let data = req.body
        let idC = req.user.uid

        const publication = await Publication.findById(id)
        if(!publication){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }
        
           
        if(publication.user.toString() !== idC){
            return res.status(404).send(
                {
                    success: 'false',
                    message: `The Publication is not yours`
                }
            )
        }
        
        let updatedPublication = await Publication.findByIdAndUpdate(
            id,
            data,
            {new: true}
        ) 

        if(!updatedPublication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Publication updated',
                updatedPublication
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with updatePublication',
                error
            }
        )
    }
}

export const deletePublication = async(req, res) => {
    try{
        let {id} = req.params
        const idC = req.user.uid

        const publication = await Publication.findById(id)

        if(!publication){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }

        if(publication.user.toString() !== idC){
            return res.status(404).send(
                {
                    success: 'false',
                    message: `The Publication is not yours`
                }
            )
        } 

        
        let deletedPublication = await Publication.findByIdAndDelete(id)

        if(!deletedPublication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Publication delete Successfully',
                deletedPublication
            }
        )
    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', 
                error
            }
        )
        
    }
}
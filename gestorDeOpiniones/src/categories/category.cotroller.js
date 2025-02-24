'use strict';
import Category from'./category.model.js';


export const saveCategory = async (req,res) => {
      try {
        const data = await req.body
        const category = new Category(data)
        await category.save()
        category.populate()

        return res.send(
            {
                success: true,
                message: `Category saved successfully ${category.name}`
            }
        )
       
    

      } catch (error) {
        console.error(error);
        return res.status(500).send(
            {
                success:false,
                message:'General error with addCategory',
                error
            }
        )
      }  
}

export const getAllCategories = async (req,res) => {
    try {
       const {limit, skip} = req.query
        const category = await Category.find()
        .skip(skip)
        .limit(limit)

        if (category.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message:'Category not found'
                }
            )
        }

        return res.send(
            {
                success:true,
                message:'Categories found',
                total:category.length,
                category
            }
        )
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with getAllCategories',
                error
            }
        )
    }
}

export const updateCategory = async (req,res) => {
    try {
        const {id}=req.params
        const {name,description}=req.params

        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name,description},
            {new:true}
        )

        if(!updateCategory){
            return res.status(404).send(
                {
                    success:false,
                    message:'Category not found'
                }
            )
        }
        return res.status(200).send(
            {
              success:true,
              message:'Category updated successfully',
              updateCategory  
            }
        )
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send(
            {
                success:false,
                message:'General errror with updateCategory',
                error
            }
        )
    }
}

export const deleteCategory = async (req,res) => {
    try {
        const {id}=req.params
       const data = req.body

       const deleteCategory = await Category.findByIdAndDelete(id)
       if(!deleteCategory)return res.status(404).send(
            {
                success:false,
                message:'category not found'
            }
       )
       return res.send(
        {
            success:true,
            message:'category deleted successfully'
        }
       )
       
       
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send(
         {
            message:'general error with deleteCategory',
            error
         }
            
        )
    }
}
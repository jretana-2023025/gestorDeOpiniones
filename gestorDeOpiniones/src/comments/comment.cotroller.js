'use strict';

import Comment from '../comments/comment.model.js'
import Publication from '../publication/publication.model.js'

export const addComment = async (req,res) => {
    const {publicationId} = req.params
    const data = req.body
    const id = req.user.uid

    try {
        const publication = await Publication.findById(publicationId)
        if(!publication){
            return res.status(404).send(
                {
                    success: false,
                    message:'Publication not found'
                }
            )
        }

        const comment = new Comment(
            {
                ...data,
                publication: publicationId,
                user:id
            }
        )

        await comment.save()

        await Publication.findByIdAndUpdate(
            publicationId,
            {$push:{comment: comment._id}},
            {new:true}
        )

        return res.status(201).json(
            {
                success: true,
                message: 'Comment added successfully',
                comment
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).json(
            {
                success: false,
                message: 'Error with addComment'
            }
        )
    }
}

export const updateComment = async (req,res) => {
    try {
        let {id}= req.params
        let data = req.body
        const idC = req.user.uid   

        


        const comment = await Comment.findById(id) 

        if (!comment){
            return res.status(404).send(
                {
                success: false,
                message: 'Comment not found'
                }
            )
        }

        if(comment.user.toString()!==idC){
            return res.status(404).send(
                {
                    success:false,
                    massage:`The comment is not yours`
                }
            )
        }

        let updateComment = await Comment.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!updateComment) return res.status(404).send(
            {
                success:false,
                message:'comment did not found'
            }
        )

        return res.send(
            {
                success:true,
                message:'Comment updated successfully',
                updateComment
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message:'General Error',
                error
            }
        )
    }
}

export const deleteComment = async (req,res) => {
    try {
        let {id} = req.params
        const idC = req.user.uid   

        const comment = await Comment.findById(id)

        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        if(comment.user.toString() !== idC){
            return res.status(404).send({
                success: false,
                message: `The comment is not yours`
            })
        }


        let deletedComment = await Comment.findByIdAndDelete(id)
        
        if(!deletedComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Comment deleted successfully',
                deletedComment
            }
        )
 
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message:'General Error',
                error
            }
        )
    }
}
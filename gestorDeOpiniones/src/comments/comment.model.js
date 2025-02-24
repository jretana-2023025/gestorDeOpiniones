import {Schema ,model} from 'mongoose'

const commentSchema = Schema(
    {
        description:{
            type:String,
            required:[true,'Description is required'],
            maxLength:[500,'Description can not be overcome 500 characters']
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:[true,'User is required']
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model('Comment',commentSchema)
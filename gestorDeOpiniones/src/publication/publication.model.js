import { Schema, model } from "mongoose";

const publicationSchema = Schema(
    {
        title:{
            type: String,
            required:[true,'Title is required'],
            maxLength:[100,'Title must be less than 100 characters'],

        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required:[true,'Category is required']
        },
        mainText:{
            type: String,
            required:[true,'Main Text is required'],
            maxLength:[10000,'can not be overcome 10000 characters']
        },
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }],
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:[true,'User is required']
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model('Publication',publicationSchema)
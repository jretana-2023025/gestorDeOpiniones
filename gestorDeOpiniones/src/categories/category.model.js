import { Schema, model } from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type:String,
            required:[true, 'Name is required'],
            trim:true

        },
        description:{
            type:String,
            trim:true,
            required:[true, 'Description is required'],
            maxLength:[200,`Can't be overcome 200 characters`]
        }
        
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model('Category',categorySchema)

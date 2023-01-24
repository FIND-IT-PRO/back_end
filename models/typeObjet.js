const mongoose = require('mongoose');



const schemaTypeObjet = mongoose.Schema({
        categorie : {
            type:String , 
            required :true, 
            maxlength:50,
            minlength:1
        },
        sousCatergorie:{
             type:String, 
             maxlength:50},
        status: {
                type: String,
                required: true,
                enum: ["active", "inactive"],
                default: "active",
              }

     
})

const TypeObjet = mongoose.model('TypeObjet' ,schemaTypeObjet );
module.exports = TypeObjet;
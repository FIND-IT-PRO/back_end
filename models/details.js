const mongoose = require('mongoose');


const detailSchema = mongoose.Schema({
         text:String,
         images :[{type:String}],
         typeObjet_id :{
                  type : mongoose.Schema.Types.ObjectId,
                  ref : "TypeObjet"
            },
         contact_id :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "Contact"
          },
          status : {
            type: String,
              enum:["active","inactive"],
              default:"active"
          }
})

const Detail = mongoose.model('Detail',detailSchema);
module.exports = Detail;
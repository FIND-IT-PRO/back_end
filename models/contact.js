const mongoose = require('mongoose');


const contactSchema=mongoose.Schema({
           nome : {type:String ,maxlength:50},
           prenom: {type:String , maxlength:50 },
           tel : {type:String  ,maxlength:15},
           email:{ 
            type:String,
            maxlength:100,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
         },
         status : {
              type:String,
              enum:["active","inactive"],
              default:"active"
         }
});

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;

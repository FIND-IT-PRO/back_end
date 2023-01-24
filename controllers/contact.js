const Contact = require('../models/contact');



var addData = async (req,res)=>{
          try{
               var data = req.body;
               var objetContact =await new Contact(data);
               var instance = await objetContact.save();
               res.send(instance).status(200)
          }catch(exception){
            res.send(exception).status(400)
          }
}

var getAllData = async (req,res)=>{
       try{
          const data =await Contact.find({status:"active"})
          res.send(data).status(200)
 
       }catch(exception){
        res.send(exception).status(404)  
       }
}

var getdataByid = async (req,res)=>{
        try{
         const data = await Contact.findById(req.params._id);
         res.send(data).status(200)
        }catch(exception){
         res.send(exception).status(400)
        }

}

var updateData = async (req,res)=>{
      try{
        const data =await  Contact.findByIdAndUpdate(req.params._id, req.body,{new:true});
        res.send(data).status(200)
      }catch(exception){
        res.send(exception).status(400)
      }


}

var deleteData = async (req,res)=>{
       try{
           const data = await Contact.findByIdAndUpdate(req.params._id,{$set:{status:"inactive"}},{new:true});   
            res.send(data).status(200)
       }catch(exception){
            res.send(exception).status(400)
       }
}


module.exports = {addData , getAllData , getdataByid , updateData , deleteData}
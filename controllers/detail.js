const Detail = require('../models/Details')
const Contact = require('../models/contact')
const TypeObject = require('../models/typeObjet')

const addData = async (req,res)=>{
       try{
        const data = req.body;
        const detailObjet =await new Detail(data);
        const instance =await detailObjet.save();
        res.send(instance).status(200)
       }catch(exception){
        res.send(exception).status(400)
       }  
}

const getAllData = async (req,res)=>{
       try{
         const data =await Detail.find({status:"active"}).populate('typeObjet_id contact_id');;
         res.send(data).status(200)
       }catch(exception){
        res.send(exception).status(400)
       } 
}

const getDataById = async (req,res)=>{
    try{
        const data = await Detail.findById(req.params._id).populate('typeObjet_id contact_id');
        res.send(data).status(200)

    }catch(exception){
        res.send(exception).status(400)
    }
}

const updateData = async (req,res)=>{
    try{
      const data =await Detail.findByIdAndUpdate(req.params._id , req.body , {new :"true"});
      res.send(data).status(200)   

    }catch(exception){
      res.send(exception).status(400)
    }
}

const deleteData = async (req,res)=>{
    try{
      const data =await Detail.findByIdAndUpdate(req.params._id,{$set:{status:"inactive"}},{new:true}).populate('typeObjet_id contact_id')
    await inactiveTypeObjet(String(data.typeObjet_id._id))
    await inactiveContact(String(data.contact_id._id))

      res.send(data).status(200)  
     
    }catch(exception){
      res.send(exception).status(400)
    }
}


module.exports = {addData , getAllData, getDataById , updateData , deleteData }


// Pour inactivé les relations associe !! 

const inactiveTypeObjet = async (_id)=>{
  try{
    const data = await TypeObject.findByIdAndUpdate(_id,{$set:{status:"inactive"}},{new:true});
  }catch(exception){
     console.error(exception)
  }
}

const inactiveContact = async (_id)=>{
  try{
    const data = await Contact.findByIdAndUpdate(_id,{$set:{status:"inactive"}},{new:true});
  }catch(exception){
     console.error(exception)
  }
}


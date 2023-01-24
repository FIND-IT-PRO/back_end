const Detail = require('../models/Details')


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
         const data =await Detail.find({statsu:"active"});
         res.send(data).status(200)
       }catch(exception){
        res.send(exception).status(200)
       } 
}

const getDataById = async (req,res)=>{
    try{
        const data = await Detail.findById(req.params._id);
        res.send(data).status(200)

    }catch(exception){
        res.send(exception).status(200)
    }
}

const updateData = async (req,res)=>{
    try{
      const data =await Detail.findByIdAndUpdate(req.params._id , req.body , {new :"true"});
      res.send(data).status(200)   

    }catch(exception){
      res.send(exception).status(200)
    }
}

const deleteData = async (req,res)=>{
    try{
      const data =await Detail.findByIdAndUpdate(req.params._id,{$set:{status:"inactive"}})
      res.send(data).status(200)  
 
    }catch(exception){
      res.send(exception).status(200)
    }
}


module.exports = {addData , getAllData, getDataById , updateData , deleteData }
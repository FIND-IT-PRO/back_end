const TypeObjetModel = require('../models/typeObjet');
const mongoose = require('mongoose');


var addData = async (req,res)=> {
     try{
        const Data = req.body;
        const instance =await new TypeObjetModel(Data);
        const resultat =await instance.save();
        res.send(resultat).status(200)
     }catch(err){
        res.send(err)
        console.error(err)
     }
}

var getDataByid = async (req,res)=>{
   try{
      const result = await TypeObjetModel.findById(req.params._id , {status:"active"})
      res.send(result).status(200)
      
   }catch(err){
      res.send(err).status(404)  
   }
      
}

var getAll = async (req,res)=>{
      try{
         const result = await TypeObjetModel.find({status:"active"}); // return array
         res.status(200).send(result)
      }catch(err){
         res.send(err).status(404)
      }

}

var updateData = async (req,res)=>{
      try{
         const resultat = await TypeObjetModel.findById(req.params._id);
         resultat.categorie = req.body.categorie;
         resultat.sousCatergorie = req.body.sousCatergorie;
         resultat.status = req.body.status;
          const resultatUpdate = await resultat.save();   
          res.send(resultatUpdate).status(200)
      }catch(err){
         res.send(err).status(404)
      }            
}
var deletData = async (req,res)=>{
     try{
      const resultat = await TypeObjetModel.findByIdAndUpdate(req.params._id , {$set:{status:'inactive'}});
      res.send(resultat).status(200)
     }catch(err){
      res.send(err).status(404)  
     }

}

module.exports = {addData , getDataByid , getAll , updateData , deletData}
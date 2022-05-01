const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Hospital = require("../models/hospital.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/").post((req,res)=>{
    console.log("postUser method");
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        } else{
            const hospital = new Hospital({
                name:req.body.name,
                mobileNo:req.body.mobileNo,
                noOfBeds:req.body.noOfBeds,
                noOfDoctor:req.body.noOfDoctor,
                availableDoctor:req.body.availableDoctor,
                availableBeds:req.body.availableBeds,
                userName:req.body.userName,
                password:hash
            });
            hospital
              .save()
              .then(()=>{
                  console.log("User Registered")
                  res.status(200).json("Okay")
              })
              .catch((err)=>{
                  console.log("postUser::error"+err);
                  res.status(403).json({
                      msg: err
                  })
                  .catch((err)=>{
                      res.status(403).json({msg: err});
                  });
              })
        }
    })
}),

router.route("/login").post((req,res,next)=>{
    console.log("Login::post");
    Hospital.find({userName:req.body.userName})   
    .exec()
    .then(hospitals=>{
        if(hospitals.length<1){
            //if username does not found then array's length will be 0.
            return res.status(401).json({
                msg:"User doesn't exist.", 
            })
        }
        bcrypt.compare(req.body.password,hospitals[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg:"Password doesn't match"
                })
            }
            if(result){
                console.log("Login :: Post :: Result :: ",result);
                const token = jwt.sign({
                    userName:hospitals[0].userName,
                    name:hospitals[0].name,
                    mobileNo:hospitals[0].mobileNo
                },
                'ddyusaayh.',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    userName:hospitals[0].userName,
                    name:hospitals[0].name,
                    mobileNo:hospitals[0].mobileNo,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            err:err
        })
    })
})

module.exports = router
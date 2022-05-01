const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Resident = require("../models/resident.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/").post((req, res) => {
    console.log("AddResident PAge");
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        } else{
            const resident = new Resident({
                residentName: req.body.residentName,
                flatNo: req.body.flatNo,
                wingNo: req.body.wingNo,
                guardName: req.body.guardName,
                guardAge: req.body.guardAge,
                mobileNo: req.body.mobileNo, 
                userName: req.body.userName,
                password: hash,
                userRole: "Resident"
            });
            resident
                .save()
                .then(() => {
                    console.log("User Registered.");
                    res.status(200).json("Okay");
                })
                .catch((err) => {
                    res.status(403).json({ msg: err });
                });
        }
    })
}),
// router.route("/login").post((req,res)=>{
//     console.log("Login Page");
//     console.log("Requested User name : "+req.body.userName);
//     const user = Resident.findOne(
//         );
//         console.log(user[0].userName);
//         console.log(user.password)
//         if(user.userName!=req.body.username){
//             res.status(400).json("User doesn't exist.")
//         } else if(Resident.password!=req.body.password){
//             res.status(403).json("Password doesn't match.")
//         } else{
//             res.status(200).json("Successful Login.")
//         }
//         }
    
// )
    router.route("/login").post((req,res,next)=>{
        console.log("Login::post");
        Resident.find({userName:req.body.userName})   
        .exec()
        .then(residents=>{
           //Resident.find will return an array which we store in residents
            if(residents.length<1){
                //if username does not found then array's length will be 0.
                return res.status(401).json({
                    msg:"User doesn't exist.", 
                })
            }
            bcrypt.compare(req.body.password,residents[0].password,(err,result)=>{
                if(!result){
                    return res.status(401).json({
                        msg:"Password doesn't match"
                    })
                }
                if(result){
                    console.log("Login :: Post :: Result :: ",result);
                    const token = jwt.sign({
                        userName:residents[0].userName,
                        userRole:residents[0].userRole,
                        mobileNo:residents[0].mobileNo
                    },
                    'ddqqaayh.',
                    {
                        expiresIn:"24h"
                    }
                    );
                    res.status(200).json({
                        userName:residents[0].userName,
                        userRole:residents[0].userRole,
                        mobileNo:residents[0].mobileNo,
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
    router.route("/").get((req, res) => {
        console.log("Resident :: get :: Reqest params => ", JSON.stringify(req.params));
        Resident.find(
            (err, result) => {
                if (err) {
                    console.log("addResident:: get :: err => ", err);
                    return res.status(500).json({ msg: err });
                }
                console.log("addResident:: get", result);
                var response = {data:result};
                return res.json(response);
            }
        )
    }),
    router.route("/:id").patch((req, res) => {
        console.log("Resident :: update :: Reqest params => ", JSON.stringify(req.params));
        Resident.findOneAndUpdate(
            { id: req.params.id },
            { $set: { password: req.body.password } },
            { $set: { residentName: req.body.residentName } },
            (err, result) => {
                if (err) {
                    console.log("Resident :: update:: err => ", err)
                    return res.status(500).json({ msg: err });
                }
                const msg = {
                    msg: "Passsword Successfully updated.",

                }
                console.log("addResident:: get", result);
                return res.json(msg);
            }
        )
    })
router.route("/:id").delete((req, res) => {
    console.log("Resident:: delete:: Request params => ", JSON.stringify(req.params));
    Resident.findByIdAndDelete(req.params.id,
        (err, result) => {
            if (err) {
                console.log("Resident :: delete :: err => ", err)
                return res.status(500).json({ msg: err })
            }
            const msg = {
                msg: " User Successfully deleted ",
            }
            console.log(msg)
            return res.json(msg)
        }
    )

})
module.exports = router
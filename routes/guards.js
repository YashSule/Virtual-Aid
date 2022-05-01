const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Resident = require("../models/guard.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/guard").post((req, res) => {
    console.log("AddGuard PAge");
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        } else{
            const guard = new Guard({
                guardName: req.body.guardName,
                guardAge: req.body.guardAge,
                mobileNo: req.body.mobileNo, 
                userName: req.body.userName,
                password: hash,
                userRole: "Guard"
            });
            guard
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
});
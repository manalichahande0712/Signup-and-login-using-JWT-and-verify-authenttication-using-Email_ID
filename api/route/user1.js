const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const User1 = require('../model/user1');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/signup",function(req,res,next){

    var username=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var confirmPassword=req.body.confirmPassword;
    if(password !==confirmPassword){
        res.json({
            message:"password not matched",
        });

    }else{
        bcrypt.hash(password, 10, function(err, hash) {
            if(err){
                return res.json({
                    message:"something wrong, try leter!",
                    error:err
                });
            }else{

                console.log(hash);
               var user1=new User1({
               _id:mongoose.Types.ObjectId(),
               username:username,
               email:email,
                password:hash
              });

             user1.save()
              .then(doc=>{
                 res.status(201).json({
                   message:"User Registerd Successfully",
                      result:doc
                 });
            })
           .catch(err=>{
             res.json(err);
            });
        }

    });
  }

});



router.post('/login',(req,res,next)=>{
    User1.find({email:req.body.email})
    .exec()
    .then(user1=>{
        if(user1.length < 1)
        {
            return res.status(401).json({
                msg: 'user not exist'
            })
        }
        bcrypt.compare(req.body.password,user1[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                username:user1[0].username,
                email:user1[0].email
                 },
                   'this is dummy text',
                   {
                       expiresIn:"24h"
                   }
                   );
                   res.status(200).json({
                       username:user1[0].username,
                       email:user1[0].email,
                       token:token
                   })      
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

    
module.exports = router;
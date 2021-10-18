const express = require("express");
const fs = require("fs");
const aws = require("aws-sdk");


aws.config.update({
       accessKeyId: "AKIAY3L35MCRZFF5RA4W", 
       secretAccessKey: "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", 
      region: "ap-south-1", 
     });



     let uploadFile = async (file) => {
 

      return new Promise(function (resolve, reject) {
        
        
        
        // Create S3 service object
            let s3 = new aws.S3({ apiVersion: "2006-03-01" });
        
        var uploadParams = {
          ACL: "public-read", /// this file is accesible publically..permission
          Bucket: "classroom-training-bucket", // HERE
          Key: "pk1/" + file.originalname, // HERE
           Body: file.buffer, 
         };
        
            s3.upload(uploadParams, function (err, data) {
               if (err) {
                 return reject( { "error": err });
               }
               console.log(data)
               console.log(`File uploaded successfully. ${data.Location}`);
               return resolve(data.Location); //HERE 
             });
        })
      }
  
    module.exports.uploadFile = uploadFile
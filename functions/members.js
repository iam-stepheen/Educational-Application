const mongoose =require('mongoose')
const bcrypt = require('bcrypt');

const newuser = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    secondname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    
    },
    address:{
        type:String,
        required:false
    },
    cityl:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    postalcode:{
        type:String,
        required:false
    },
    aboutme:{
        type:String,
        required:false
    },
    questions:{
        type:Array,
        required:false
    },
    answers:{
        type:Array,
        required:false
    }
})

//function to input into database
const insert = module.exports = mongoose.model("users",newuser)

//function to add user to the database

module.exports.register = function(user_details,callback){
         console.log(user_details)
        bcrypt.hash(user_details.password, 3, function(err, hash) {
           user_details.password = hash
            user_details.save(callback)
        });
    
    
}
//function to check if the email exist 

module.exports.checkemail = function(email,callback){
  const query = {email:email}
  insert.findOne(query,callback)
}

module.exports.comparepassword = function(userpassword,hash,callback){
    bcrypt.compare(userpassword,hash,(err,isMatch)=>{
        callback(null,isMatch)
    })
}

//functions to add qquestion in the question array 
module.exports.questions = function(email,title,status,image,callback){
    console.log(email)
    var update = {"question_title":title,"question_image_url":image,"question_status":status}
    insert.update({email:email},
        {$push:{
            questions :update
        }},(err,succesfull)=>{
            if(err) throw err
            if(succesfull){
                   callback(null,succesfull)
            }
        })
}

module.exports.answer = function(email,question_title,question_image_url,question_answer,question_answer_url,callback){
    var update = {"question_answer":question_answer,"question_answer_url":question_answer_url,"question_title":question_title,"question_image_url":question_image_url}
    insert.updateOne(
        {
          email:email,
          questions: { $elemMatch: { question_title : question_title,
          question_image_url : question_image_url, } }
        },
        { $push: {
           answers:update
        } },(err,succesfull)=>{
            if(err) throw err
            else{
                callback(null,succesfull)
            }
        }
     )
}

module.exports.getquestions = function(email,callback){
    const query ={email:email}
    console.log(query)
    insert.findOne(query,callback)
}

module.exports.getanswers = function(question_title,question_image_url,email,callback){
    insert.aggregate(
        {$match :{email:email} },
          {$unwind:"$answers"},
           { $match: { "answers.question_title":question_title } }
        ,
        (err,succesfull)=>{
            if(err) throw err
            else{
                callback(null,succesfull)
            }
        }
     )
}

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const members = require('../functions/members')
var googleTranslate = require('google-translate-api')
var books = require('google-books-search');
const config = require('../config/database')
const passport = require('passport')
const mathjs = require('mathjs')
mathjs.import(require('mathjs-simple-integral'))
var solveQuadraticEquation = require('solve-quadratic-equation');
const question = require('../functions/questions')
//import fetch from 'node-fetch'
router.post('/register',(req,res)=>{
    let details = new members({
        firstname:req.body.firstname,
        secondname:req.body.secondname,
        email:req.body.email,
        password:req.body.password,
        aboutme:req.body.aboutme,
        questions:[ ],
        answers:[ ]
       
    
    })

    //checking if the inputed email exist in the databae

  //calling the function to add user to database
   members.checkemail(details.email,(err,succesfull)=>{
       if(err) throw err
       if(succesfull){
           res.json({
               success:false,
               msg:details.email + " has been taken"
           })

           
       }
       if(!succesfull){
        members.register(details,(err,succesfull)=>{
            if (err) throw err 
            if(succesfull){
                res.json({
                    success:true,
                    msg:"You've been succesfully registered check "+succesfull.email+ " you can now login "
                })
            }
        })
       }
   })
 
})


//route to login user into database 
router.post('/login',(req,res,send)=>{
    //first we get the username of all inputed fields
    const email = req.body.email
    const password = req.body.password
    //now we call the find user function to know if the user exists in the database
    members.checkemail(email,(err,user)=>{
       
        if (err) throw err
        if(user){
            //we call the function to compare the paswword with that in the database
            members.comparepassword(password,user.password,(err,isMatch)=>{
                if(err) throw err
                if(isMatch){
                    console.log(user)
                   const token = jwt.sign(user.toJSON(),config.secret)
                    res.json({success:true,msg:"you are now logged in",
                   token:'JWT '+token,
                    user:{
                        firstname:user.firstname,
                        secondname:user.secondname,
                        email:user.email,
                        id:user.id
                    }})
                }
                else{
                    res.json({success:false,msg:"Invalid Email/password Combination",
                   })
                }
            })

        }
        else{
            res.json({success:false,msg:"Invalid Email/password Combination"})
        }
    })
})

    
    
router.get('/profile', passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.send({user:req.user});
}
);

//route to edit profile details 




   
   //api to translate to any other language 
   router.post('/booksearch',(req,res)=>{
    const title = req.body.title
   

    books.search(title, function(error, results) {
        if ( ! error ) {
           res.json({
               success:true,
               results:results
           })
        } else {
            console.log(error);
        }
    });
  
   })
   router.post('/translate',(req,res)=>{
       const details = ({
           sourceLang:req.body.sourceLang,
           targetLang:req.body.targetLang,
           sourceText:req.body.sourceText
       })
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
    + details.sourceLang + "&tl=" + details.targetLang + "&dt=t&q=" + encodeURI(details.sourceText)
  
    var result = fetch(url)
  //  UrlFetchApp.fetch
    //translatedText = result[0][0][0];
    res.json({
        success:true,
        //translatedText:translatedText
    })
   })
   router.post('/equations',(req,res)=>{
           const problem = req.body.problem
           const equation = req.body.equation
    if(problem == 'algebra'){
      const answer =  mathjs.simplify(equation).toString()
      res.json({
          success:true,
          answer:answer
      })
    }
    if(problem=="integration"){
        const respect = req.body.respect  
        const simplified  = mathjs.simplify(equation).toString()
        const answer = mathjs.integral( simplified, respect ).toString()
        res.json({
            success:true,
            answer:answer
        })
    }
    if(problem=="differentiaton"){
        const respect = req.body.respect
        const answer = mathjs.derivative( equation, respect ).toString()
        res.json({
            success:true,
            answer:answer
        })
    }
    if(problem == "quadratic"){
        const a = req.body.a
        const b = req.body.b
        const c = req.body.c
         var answer = solveQuadraticEquation(a,b,c);
         res.json({
            success:true,
            answer:answer
        })
    }
    
   })

router.post('/question',(req,res)=>{
    const email = req.body.email
    const question_title = req.body.question_title
    const question_status = 0
    const question_image = req.body.question_image

    const details = new question ({
         email : req.body.email,
       question_title : req.body.question_title,
         question_status : 0,
         question_image : req.body.question_image
    })
    
       members.questions(email,question_title,question_status,question_image,(err,succesfull)=>{
           if(err) throw err
           if(succesfull){
            
               question.insert(details)
               res.json({
                   success:true,
                   msg:"Question have been uploaded"
               })
             
           }

       })
})
router.post('/answer',(req,res)=>{
    const details =  ({
        email:req.body.email,
        question_title:req.body.question_title,
        question_image : req.body.question_image,
        question_answer:req.body.question_answer,
        question_answer_url:req.body.question_answer_url
    })

    members.answer(details.email,details.question_title,details.question_image,details.question_answer,details.question_answer_url,(err,succesfull)=>{
        if(err) throw err
        if(succesfull){
            res.json({
                success:true,
                msg:"Question Successfully answered"
            })
        }
    })

})
router.post('/getquestions',(req,res)=>{
    const email = req.body.email
    members.getquestions(email,(err,succesfull)=>{
        if(err) throw err
        if(succesfull){
            res.json({
                success:true,
                questions:succesfull.questions
            })
        }
    })
})

router.post('/getanswers',(req,res)=>{
    const details = ({
        question_title:req.body.question_title,
        question_image:req.body.question_image,
        email:req.body.email
      
    })
    members.getanswers(details.question_title,details.question_image,details.email,(err,succesfull)=>{
if(err) throw err
if(succesfull){
    res.json({
        success:true,
        msg:succesfull
    })
}
    })

})

router.get('/getallquestions',(req,res)=>{
    question.getall((err,succesfull)=>{
        if(err) throw err
        if(succesfull){
            res.json({
                success:true,
                results:succesfull
            })
        }
    })
})

router.get('/booksearch',(req,res)=>{
    const title = req.body.title
    books.search(title, function(error, results) {
        if ( ! error ) {
            console.log(results);
        } else {
           res.json({
               success:true,
               result:results
           })
        }
    });
})

module.exports = router
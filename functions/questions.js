const mongoose = require('mongoose')
const questions = mongoose.Schema({
    question_title:{
        type:String,
        required:false
        
    },
    question_image:{
        type:String,
        required:false
    },
    question_status:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
})

const insert = module.exports = mongoose.model('question',questions)

module.exports.insert = function(details,callback){
details.save(null)
}
module.exports.getall = function(callback){
    const query = {question_status : 0}
    insert.find(query,callback)
}
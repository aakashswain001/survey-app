const mongoose = require('mongoose');

const SurveySchema = mongoose.Schema({ 
    username: {type:String,required:true},
    title: {type:String,required:true},
    anon:{type:Boolean,required:true},
    questions:[
        {
            qno:Number,
            qtype:String,
            title:String,
            req:Boolean,
            choices:[String]
        }
    ],
    answers:[
        {
            email:String,
            ans:[
                {
                    qno:Number,
                    anstext:String,
                    choices:[String]
                }
            ] 
        }
    ]
});

module.exports = mongoose.model('Survey', SurveySchema);
const Survey = require('../models/survey.model.js');

// create survey
exports.create = (req, res) => {

    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Survey details can not be empty"
        });
    }

    // Create a item
    const survey = new Survey({
        username: req.body.username, 
        title: req.body.title,
        anon:req.body.anon,
        questions:req.body.questions
    });

    // Save Note in the database
    survey.save()
    .then(data => {
        res.send({message:"Added Successfully"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Survey."
        });
    });
};


// Retrieve and return all survey from the database of same user.
exports.findAll = (req, res) => {
    Survey.find({username:req.params.username},{title:1})
    .then(surveys => {
        res.send(surveys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving surveys."
        });
    });
};

exports.findOne = (req, res) => {
    Survey.find({username:req.params.username,_id:req.params.surveyId},{answers:0,__v:0})
    .then(survey => {
        res.send(survey);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving survey."
        });
    });
};



//adding answers
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Survey content can not be empty"
        });
    }
    // Find survey and update it with the request body
    

    let ans = {email:req.body.email,
                ans:req.body.ans
                };

    Survey.update(
        {_id:req.params.surveyId},
        {$push:{answers:ans}})
    .then(survey => {
        if(!survey) {
            return res.status(404).send({
                message: "Survey not found with id " + req.params.surveyId
            });
        }
        res.send(survey);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Survey not found with id " + req.params.surveyId
            });                
        }
        return res.status(500).send({
            message: "Error updating survey with id " + req.params.surveyId
        });
    });
};
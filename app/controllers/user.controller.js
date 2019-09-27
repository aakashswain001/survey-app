const User = require('../models/user.model.js');

// register
exports.create = (req, res) => {

    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User details can not be empty"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        username: req.body.username, 
        password: req.body.password
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send({message:"Register Successful",userDetails:data});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


// login
exports.findOne = (req, res) => {
   
    User.find({username:req.body.username,password:req.body.password})
    .then(user => {
        if(user.length == 0) {
            return res.status(404).send({
                message: "Wrong username or password " 
            });            
        }
        res.send({message: "Login Successful",userDetails:user});
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving user "
        });
    });
};
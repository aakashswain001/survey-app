module.exports = (app) => {
    const survey = require('../controllers/survey.controller.js');

    // Create a new Survey
    app.post('/survey/', survey.create);

    //get all survey of user
    app.get('/survey/:username',survey.findAll);

    //get a single survey
    app.get('/survey/:username/:surveyId',survey.findOne);

    //answer to single survey
    app.put('/survey/:surveyId',survey.update);
}
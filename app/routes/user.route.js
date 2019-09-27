module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/user/register/', user.create);

    //login
    app.post('/user/login/',user.findOne);
}
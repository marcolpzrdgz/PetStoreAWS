const controllers = require("../modules/index") 

//routes
module.exports =(app) => {
    app.get("/api/:nameP", controllers.api);
}
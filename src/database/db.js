const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/omnistack9',{ useNewUrlParser: true, useUnifiedTopology: true  },(err) =>{
    if(err){
        console.log(err);
    }

   
});
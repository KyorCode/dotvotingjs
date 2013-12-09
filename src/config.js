function config(){
    "use strict";
    
    var production = process.env.NODE_ENV === 'production';
    
    var expressSettings = {
        port : process.env.PORT || 3000,
        ip : process.env.IP || "127.0.0.1"
    };
    
    if(production){
        expressSettings = {};
    }
    
    return {
        expressSettings: expressSettings
    };
}

module.exports = config();
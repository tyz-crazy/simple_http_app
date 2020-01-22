const mongoose = require("mongoose");

// If will be needed we can add validations to each field
const analitic_schema = new mongoose.Schema({
    page_id: {
        type: String,
        index: true
    },
    user_id: {
        type: String,
        index: true
    },
    timestamp: {
        type: String,
        index: true
    },
    browser: {
        type: String,
        index: true
    },
    country: {
        type: String,
        index: true
    },
    analitic_data: {
        type: Object
    }
});


module.exports = ( db ) => 
{
    db.model("Analitic", analitic_schema);
};
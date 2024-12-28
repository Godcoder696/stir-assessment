const mongoose= require('mongoose');

const trendModel= mongoose.Schema(
    {
        trendsList:{
            type: Array,
            required: true
        },
        extractedAt: {
            type : String, 
            required: true
        },
        ipAddrrs:{
            type: String,
            required: true
        }
    }
)

const Trends= mongoose.models.Trends || mongoose.model("Trends",trendModel);
module.exports= Trends
const mongoose= require("mongoose");
const Trends = require("./model/Trends");

async function connectDB(){
    try {
        // Attempt to connect to the database
        await mongoose.connect("mongodb+srv://lionleo110:Czu8kilnh19r056V@cluster0.1n2poif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || '');
    
        console.log('Database connected successfully');
    } 
    catch (error) {
        console.error('Database connection failed:', error);
    }
}

async function insertAllTrends(trends, dateTime, ipAddrrs){
    try {
        Trends.create({
            trendsList: trends,
            ipAddrrs: ipAddrrs,
            extractedAt: dateTime
        })
    } catch (error) {
        console.log("error occured");
    }
}


module.exports={connectDB,insertAllTrends}
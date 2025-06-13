
const mongoose = require('mongoose');
let {USER_NAME,PASSWORD,DATABASE_NAME} = process.env;

 

// console.log(PASSWORD) 
function dbConnection() {
   mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.iyecvsd.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    // console.log('db Connected')
})
}
 
module.exports = dbConnection;
 
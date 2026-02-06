const mongoose = require('mongoose');
const uri = "mongodb+srv://bharadwajkundurthi9_db_user:Bharadwaj%40123456@cluster0.e7kwhc5.mongodb.net/blackfriday?appName=Cluster0";

console.log("Attempting to connect with standard URI...");
mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILED:", err.message);
        process.exit(1);
    });

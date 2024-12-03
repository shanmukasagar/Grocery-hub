
const {connectToMongo, getDB} = require("../../lib/mongoClient");
const bcrypt  = require('bcryptjs');

/**
 * User Login
 */
export async function userLogin (userData) {
    try{
        await connectToMongo();
        const userCollection = getDB().collection(process.env.USERS_MODEL);
        const userDocument = await userCollection.findOne({email : userData.email});
        if(!userDocument) {
            return {isSuccess : false, msg : "Invalid credentials"};
        }
        const isPwdCorrect = await bcrypt.compare(userData.pwd, userDocument.pwd);
        if(!isPwdCorrect) {
            return {isSuccess : false, msg : "Invalid credentials"};
        }
        return {isSuccess : true, msg : "Login successfully"};
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * User registration
 */
export async function userSignup (userData) {
    try{
        await connectToMongo();
        const userCollection = getDB().collection(process.env.USERS_MODEL);
        const userDocument = await userCollection.findOne({email : userData.email});
        if(userDocument) {
            return {isSuccess : false, msg : "Email already exist"};
        }
        userData.c_on = new Date();
        userData.t_id = userData.email;
        userData.pwd = await bcrypt.hash(userData.pwd, 10);
        const response = await userCollection.insertOne(userData);
        if(response.acknowledged) {
            return {isSuccess : true, msg : "Registered successfully"};
        }
        return {isSuccess : false, msg : "Error occured while registering"};
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
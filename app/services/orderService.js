const {connectToMongo, getDB} = require("../../lib/mongoClient");
const shortid = require('shortid');
/**
 * User Login
 */
export async function addOrderItems (orderData) {
    try{
        await connectToMongo();
        const orderCollection = getDB().collection(process.env.ORDERS_MODEL);
        orderData.c_on = new Date();
        orderData.status = "success";
        orderData.order_id = getUniqueID();
        const result = await orderCollection.insertOne(orderData);
        if(result.acknowledged) {
            return true;
        }
        return false;
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
/**
 * This function is to generate the unique id
 */
function getUniqueID(){
    let sid = shortid.generate();
    if (sid.length > 7) { 
        sid = sid.substring(0, 7); // If the ID is longer than 7 characters, truncate it
    }
    return sid;
}

export async function getOrderItems(userData) {
    try{
        await connectToMongo();
        const orderCollection = getDB().collection(process.env.ORDERS_MODEL);
        const result = await orderCollection.find({t_id : userData.email}).sort({ _id: -1 }).toArray();
        return result;
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
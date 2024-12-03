const {connectToMongo, getDB} = require("../../lib/mongoClient");
const shortid = require('shortid');
/**
 * Get all cart list
 */
export async function getCartlist (userData) {
    try{
        await connectToMongo();
        const cartsCollection = getDB().collection(process.env.MYCART_MODEL);
        const cartsData = await cartsCollection.find({t_id : userData.email}).toArray();
        return cartsData;
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
/**
 * add  item into cart list
 */
export async function addCartItem (cartData) {
    try{
        await connectToMongo();
        const cartsCollection = getDB().collection(process.env.MYCART_MODEL);
        cartData.uniq_id = getUniqueID();
        const res = await cartsCollection.insertOne(cartData);
        if(res.acknowledged) {
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
/**
 * delete  item from cart list
 */
export async function deleteCartItem (cartData) {
    try{
        await connectToMongo();
        const cartsCollection = getDB().collection(process.env.MYCART_MODEL);
        const res = await cartsCollection.deleteOne({uniq_id : cartData.uniq_id});
        if(res.acknowledged) {
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
 * delete  items from cart list
 */
export async function deleteCartList (userData) {
    try{
        await connectToMongo();
        const cartsCollection = getDB().collection(process.env.MYCART_MODEL);
        const res = await cartsCollection.deleteMany({t_id : userData.t_id});
        console.log(userData.email);
        if(res) {
            return true;
        }
        return false;
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
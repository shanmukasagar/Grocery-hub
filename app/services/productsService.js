const {connectToMongo, getDB} = require("../../lib/mongoClient");

/**
 * Get all products
 */
export async function getAllProducts () {
    try{
        await connectToMongo();
        const productsCollection = getDB().collection(process.env.ITEMS_MODEL);
        const productsData = await productsCollection.find({}, { projection: { _id: 0 } }).toArray();
        return productsData
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
/**
 * Get all product categories
 */
export async function getProductCategories (category) {
    try{
        await connectToMongo();
        const productsCollection = getDB().collection(process.env.ITEMS_MODEL);
        const productsData = await productsCollection.find({"cat" : category}, { projection: { _id: 0 } }).toArray();
        return productsData
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}
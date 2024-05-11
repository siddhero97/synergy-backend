const couchbase = require("couchbase");
const {
    User,
    USER_MODEL_NAME
} = require("./user/user.model");
let cluster;
let bucket;
let scopedBucket;
let database;


const {
    generateUUID
} = require('./utils');

require("dotenv").config();
async function main() {
    // User inputs
    // Sample airline document
    let sample_airline = {
        type: "airline",
        id: 8091,
        callsign: "CBS",
        iata: null,
        icao: null,
        name: "Couchbase Airways",
    };
    // Key will be "airline_8091"
    const key = "airline_8091";
    // Get a reference to the cluster
    const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password,
        // Use the pre-configured profile below to avoid latency issues with your connection.
        configProfile: "wanDevelopment",
    });
    // Get a reference to the bucket
    const bucket = cluster.bucket(bucketName);
    // Get a reference to the collection
    const collection = bucket.scope(scopeName).collection(collectionName);

    // Simple K-V operation - to create a document with specific ID
    let createResult = await collection.insert(key, User);
    console.log("Create Document CAS: ", createResult.cas.toString());
    // Simple K-V operation - to retrieve a document by ID
    let getResult = await collection.get(key);
    console.log("Fetched document success. Result: ", getResult.content);
    // Simple K-V operation - to update a document by ID
    sample_airline.name = "Couchbase Airways!!";
    let updateResult = await collection.replace(key, sample_airline);
    console.log("Update document success. CAS: ", updateResult.cas.toString());
    // Simple K-V operation - to delete a document by ID
    let deleteResult = await collection.remove(key);
    console.log("Delete document success. CAS: ", deleteResult.cas.toString());
}

async function connectToCouchbase() {
    try {
        console.log("process.env.COUCHBASE_URL ", process.env.COUCHBASE_URL)
        cluster = await couchbase.connect(process.env.COUCHBASE_URL, {
            username: process.env.COUCHBASE_USER,
            password: process.env.COUCHBASE_PASSWORD,
            // Use the pre-configured profile below to avoid latency issues with your connection.
            configProfile: "wanDevelopment"
        });
        console.log('Connected to Couchbase');

        const bucketName = process.env.COUCHBASE_BUCKET;
        bucket = cluster.bucket(bucketName);
        console.log("bucket ", bucket)
        await bucket.waitUntilReady();

        const scopeName = process.env.COUCHBASE_SCOPE;

        console.log('Connected to Couchbase Bucket');
        scopedBucket = bucket.scope(scopeName);

    } catch (error) {
        console.error('Error connecting to Couchbase:', error);
    }
}

async function createUserCouchbase(userData) {
    try {
        // Get or create a scope
        console.log("bucket ", bucket)
        const scope = bucket.scope(process.env.COUCHBASE_SCOPE);
        console.log("scope ", scope)


        // const collection = scope.collection('collection_name');

        // Insert a document
        const docId = generateUUID();
        const docContent = `{
            field1: 'value1',
            field2: 'value2'
        }`;
        const result = await collection.insert(docId, docContent);
        console.log('Document inserted successfully:', result);
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = {
    connectToCouchbase,
    createUserCouchbase
}
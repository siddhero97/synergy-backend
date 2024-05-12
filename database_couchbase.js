var couchbase = require("couchbase");
require('dotenv').config();

const clusterConnStr = process.env.CLUSTER_CONN_STR; // Replace this with Connection String
const username = process.env.DB_USERNAME; // Replace this with username from database access credentials
const password = process.env.DB_PASSWORD; // Replace this with password from database access credentials
const bucketName = process.env.BUCKET_NAME;
const scopeName = process.env.SCOPE_NAME;
const collectionName = process.env.COLLECTION_NAME;

async function connectToCouchbase() {
    console.log(collectionName);
    const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password
    });
    const bucket = cluster.bucket(bucketName);
    const collection = bucket.scope(scopeName).collection(collectionName);
    return { cluster, bucket, collection };
}

module.exports = { connectToCouchbase }
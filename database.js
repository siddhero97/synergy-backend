var couchbase = require("couchbase");
const User = require("./user/user.model");
async function main() {
  // User inputs
 const clusterConnStr = "couchbases://cb.hftzf51gbr0k5qjf.cloud.couchbase.com"; // Replace this with Connection String
 const username = "admin"; // Replace this with username from database access credentials
 const password = "<<password>>"; // Replace this with password from database access credentials
 const bucketName = "travel-sample";
 const scopeName = "_default";
 const collectionName = "synergy";
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
 // Run the main function
 main()
    .catch((err) => {
     console.log("Error: ", err);
     process.exit(1);
     })
     .then(process.exit);
function generateUUID() {
    return crypto.randomUUID();
}

// Example usage
const uuid = generateUUID();
console.log(uuid);

module.exports = {
    generateUUID
};
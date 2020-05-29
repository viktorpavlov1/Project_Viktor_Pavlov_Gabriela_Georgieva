/* globals module process */



let connectionString = {
    production: "mongodb://admin:qwerty123@cluster0-shard-00-00-whucp.mongodb.net:27017,cluster0-shard-00-01-whucp.mongodb.net:27017,cluster0-shard-00-02-whucp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    development: "mongodb://localhost/extreme-sports"
};

module.exports = {
    port: process.env.PORT || 3001,
    connectionString: connectionString['production']
};
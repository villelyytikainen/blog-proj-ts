const CosmosClient = require("@azure/cosmos").CosmosClient;

const partitionKey = undefined;

class BlogDao {
    constructor(cosmosClient, databaseId, containerId) {
        this.client = cosmosClient;
        this.databaseId = databaseId;
        this.containerId = containerId;

        this.database = null;
        this.container = null;
    }

    async init() {
        console.log("Setting up the database...")
        const dbResponse = await this.client.databases.createIfNotExists({
            id: this.databaseId
        });
        this.database = dbResponse.database;
        console.log("Setting up the database... done!");
        console.log("Setting up the container...");
        const coResponse = await this.database.containers.createIfNotExists({
            id: this.containerId
        });
        this.container = coResponse.container;
        console.log("Setting up the container... done!");
    }

    async find(querySpec){
        console.log("Querying for items from the database");
        if(!this.container){
            throw new Error("Collection is not initialized.");
        }
        const {resources} = await this.container.items.query(querySpec).fetchAll();
        
        return resources;
    }

    async addItem(item){
        console.log("Adding an item to the database");
        item.date = Date.now();
        const {resource: doc} = await this.container.items.create(item);

        console.log(item)
        
        return doc;
    }

    async updateItem(itemId){
        console.log("Update an item in the database");
        const doc = await this.getItem(itemId);
        const {resource: replaced} = await this.container.item(itemId, partitionKey).replace(doc);

        return replaced;
    }

    async getItem(itemId){
        console.log("Getting an item from the database");
        const {resource} = await this.container.item(itemId, partitionKey).read();

        return resource;
    }
}

module.exports = BlogDao;
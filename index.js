const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const BlogList = require("./routes/BlogList");
const BlogDao = require("./models/BlogDao");
const app = express();
const config = require("./config");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./client/dist"));

const cosmosClient = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
});

const blogDao = new BlogDao(cosmosClient, config.databaseId, config.containerId);
const blogList = new BlogList(blogDao);

blogDao.init(err => {
    console.error(err)
})
    .catch(err => {
        console.error(err);
        console.error('Shutting down because there was an error setting up the database.');
        process.exit(1);
    });

app.get("/b", (req, res, next) => blogList.showBlogs(req, res).catch(next));
app.post("/addblog", (req, res, next) => blogList.addBlog(req, res).catch(next));

app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500);
});

app.listen(3001, () => {
    console.log("server started");
});
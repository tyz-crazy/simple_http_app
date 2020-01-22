const http = require("http");
const express = require("express");
const cookie_parser = require("cookie-parser");
const expressip = require("express-ip");
const useragent = require("express-useragent");
const path = require("path");
const mongoose = require("mongoose");
const analitic_model = require("./models/analytic");
const _CONFIG = require("./config/main.config");

// Create new express instance
const ExpressApp = express();

// Configure
ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({extended: true}));
ExpressApp.use(cookie_parser());
ExpressApp.use(expressip().getIpInfoMiddleware);
ExpressApp.use(useragent.express());

// Using mongodb and Mongoose ODM
const db_con = mongoose.createConnection(_CONFIG.db.connection_string, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: Promise,
});

db_con.on("error", (error) =>
{
    console.error("Failed to connect to db", error);
});

db_con.once("open", () => 
{
    console.log("Connection to db is established");

    // Include model
    analitic_model(db_con);

    // Include routes
    _CONFIG.routes.forEach((route_name) => 
    {
        const _route_path = path.join(process.cwd(), "routes", route_name);
        // eslint-disable-next-line global-require
        const _router = require( _route_path );

        _router( ExpressApp, db_con );
    });
});

// global.db_con = db_con;

const HttpServer = http.createServer(ExpressApp);

HttpServer.listen(_CONFIG.network.port, _CONFIG.network.ip_address, (http_error) => 
{
    if ( http_error ) 
    {
        console.error(http_error);

        throw new Error(http_error);
    }

    console.log(`HTTP Server was started on: localhost:${_CONFIG.network.port}`);
});
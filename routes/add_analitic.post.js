module.exports = (app, db_con) =>
{

    /*
     * Task: 
        1. Expose rest endpoint to collect​ page-view events (HTTP calls from clients). 
            Events can contain the following parameters (all not mandatory): timestamp, user-id, page-id
        Example: http://localhost:3000/add_analitic (see example data below)
    */
    app.post("/add_analitic", (req, res) =>
    {
        // For get info about IP need access to app from external source(ip)
        const ip_info = req.ipInfo;
        const user_agent = req.useragent;

        const new_data = new db_con.models.Analitic({
            page_id: req.body.page_id,
            user_id: req.body.user_id,
            timestamp: req.body.timestamp,
            browser: user_agent.browser,
            country: ip_info.country,
            analitic_data: req.body.analitic_data,
        });

        new_data.save().then((doc) => 
        {
            // console.log(doc);
            res.json({
                result: true,
                msg: "Analytic successfully added",
                data: {},
            });
        }).catch((error) => 
        {
            console.error(error);

            res.json({
                result: false,
                msg: "Failed to added new data",
                data: {},
            });
        });
    });
}

/*
* Example of data sended from postman:
    http://192.168.88.250:3000/add_analitic
[
    {
        "page_id": 2,
        "user_id": 1,
        "timestamp": 1579614444746,
        "analitic_data": {
            "field1": "value2",
            "field2": 125,
            "any": {"someKey": "somevalue"}
        },    
    }
    {
        "page_id": 1,
        "user_id": 1,
        "timestamp": 1579614444744,
        "analitic_data": {
            "field1": "value1",
            "field2": 5,
            "any": {"someKey": "somevalue"}
        }
    }
]
*
* */
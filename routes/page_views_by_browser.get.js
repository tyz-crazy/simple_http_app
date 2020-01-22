module.exports = (app, db_con) =>
{

    /*
     * Task: 
        1.Expose rest endpoint to ​get​ page-views by a browser name (can be extracted from the user agent) 
        Example: http://192.168.88.250:3000/page_views_by_browser/Chrome
    */
    app.get("/page_views_by_browser/:browser", (req, res) =>
    {
        // Check autorization by token
        if ( !req.headers || typeof req.headers !== "object" || req.headers.authorization !== "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu" )
        {
            return res.status(401).send({
                error: "Unauthorized request!"
            });
        }
        
        if ( !req.params.browser )
        {
            return res.json({
                result: false,
                msg: "Incorrect param browser",
                data: {},
            });
        }

        const browser = String(req.params.browser).trim();

        db_con.models.Analitic.countDocuments({
            browser: browser,
        }).then((amount) => 
        {
            res.json({
                result: true,
                msg: "Operation successfully completed",
                data: {
                    amount: amount
                },
            });
        }).catch((error) => 
        {
            console.error(error);

            res.json({
                result: false,
                msg: "Failed to count data",
                data: {},
            });
        });
    });
}
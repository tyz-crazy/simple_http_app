module.exports = (app, db_con) =>
{

    /*
     * Task: 
        1. Expose rest endpoint to ​get​ page-views by page-id 
        Example: http://192.168.88.250:3000/page_views_by_page_id/3
    */
    app.get("/page_views_by_page_id/:page_id", (req, res) =>
    {
        // Check autorization by token
        if ( !req.headers || typeof req.headers !== "object" || req.headers.authorization !== "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu" )
        {
            return res.status(401).send({
                error: "Unauthorized request!"
            });
        }
        
        if ( !req.params.page_id )
        {
            return res.json({
                result: false,
                msg: "Incorrect param page_id",
                data: {},
            });
        }

        const page_id = String(req.params.page_id).trim();

        db_con.models.Analitic.countDocuments({
            page_id: page_id,
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
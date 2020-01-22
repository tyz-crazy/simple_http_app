module.exports = (app, db_con) =>
{

    /*
     * Task: 
        1.Expose rest endpoint to ​get​ the number page-views by country (should be extracted from the user IP) - the endpoint should get parameter and will return all countries with the respective number of page-views 
        2.Expose rest endpoint to ​get​ page-views by country (should be extracted from the user IP) 
        Example: http://192.168.88.250:3000/page_views_by_country?country=UA
        Example: http://192.168.88.250:3000/page_views_by_country
    */
    app.get("/page_views_by_country", (req, res) =>
    {
        // Check autorization by token
        if ( !req.headers || typeof req.headers !== "object" || req.headers.authorization !== "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu" )
        {
            return res.status(401).send({
                error: "Unauthorized request!"
            });
        }

        const pipeline = [];

        if ( req.query.country )
        {
            pipeline.push({
                $match: {
                    country: String(req.query.country).trim()
                }
            })
        }

        pipeline.push({
            $group: {
                _id: "$country",
                count: {
                    $sum: 1
                }
            }
        });

        db_con.models.Analitic.aggregate(pipeline).then((docs) => 
        {
            res.json({
                result: true,
                msg: "Operation successfully completed",
                data: docs,
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
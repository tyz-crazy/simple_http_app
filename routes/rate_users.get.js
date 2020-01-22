const is = require("is");

module.exports = (app, db_con) =>
{

    /*
     * Task: 
        1. Expose rest endpoint to ​get​ the ​rate​ between the number returning users (users who visited more than once ) 
            out of all the unique users who visited. (should be a number between 0 and 1) 
        Example: http://192.168.88.250:3000/rate_users
    */
    app.get("/rate_users", (req, res) =>
    {
        // Check autorization by token
        if ( !req.headers || typeof req.headers !== "object" || req.headers.authorization !== "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu" )
        {
            return res.status(401).send({
                error: "Unauthorized request!"
            });
        }

        db_con.models.Analitic.aggregate([
            {
                $group: {
                    _id: "$user_id",
                    count: {$sum: 1}
                },
            },
            {
                $facet: {
                    total: [{$count: "amount"}],
                    more_then_one: [
                        {
                            $match: {
                                count: {$gt: 1}
                            }
                        },
                        {$count: "amount"}
                    ]
                }
            },
            {
                $project: {
                    total: {
                        $arrayElemAt: ["$total", 0]
                    },
                    more_then_one: {
                        $arrayElemAt: ["$more_then_one", 0]
                    }
                }
            }
        ]).then((docs) => 
        {
            const result = {
                total_users: 0,
                more_then_one: 0,
                rate: 0, 
            };

            if ( Array.isArray(docs) && docs.length > 0 ) 
            {
                const doc = docs[0];

                if ( is.object(doc.total) && is.number(doc.total.amount) && doc.total.amount > 0 && is.object(doc.more_then_one) && is.number(doc.more_then_one.amount) && doc.more_then_one.amount > 0 )
                {
                    result.total_users = doc.total.amount;
                    result.more_then_one = doc.more_then_one.amount;
                    result.rate = result.more_then_one / result.total_users;
                }
            }

            res.json({
                result: true,
                msg: "Operation successfully completed",
                data: result,
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
module.exports = {
    network: {
        ip_address: "localhost",
        port: 3000,
    },

    db: {
        connection_string: "mongodb://localhost:27017/playbuzz",
    },

    routes: [
        "add_analitic.post",
        "page_views_by_page_id.get",
        "page_views_by_browser.get",
        "page_views_by_country.get",
        "rate_users.get"
    ]
};
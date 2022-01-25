const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use (
        createProxyMiddleware("/beta/devices",{
            target:"https://graph.microsoft.com",
            changeOrigin:true
        })
    )
}
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use (
        createProxyMiddleware("/beta/devices",{
            target:"https://graph.microsoft.com",
            secure:false ,
            ws:true,
            changeOrigin:true,
            router:{
                'dev.localhost.3000': 'https://orange-forest-0b82bff10.1.azurestaticapps.net/'
            }
        })
    )
}
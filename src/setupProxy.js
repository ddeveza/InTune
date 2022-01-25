const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    console.log(app);
    app.use (
        createProxyMiddleware("/beta/devices",{
            target:"https://graph.microsoft.com",
            secure:false ,
            ws:true,
            changeOrigin:true,
            router:{
                'https://orange-forest-0b82bff10.1.azurestaticapps.net/': 'https://graph.microsoft.com' ,
                
            }
        })
    )
}
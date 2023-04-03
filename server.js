const http = require("http");
const fs = require("fs");
const port = 5000;
const server = http.createServer(function(req, res) 
{
    if(req.url === "/")
    {
        req.url = "views/index.html";
    }
    if(req.url === "/dashboard")
    {
        req.url = "/views/dashboard.html";
    }
    if(req.url === "/genesis-hero")
    {
        req.url = "/views/genesis-hero.html";
    }
    if(req.url === "/faucet")
    {
        req.url = "/views/faucet.html";
    }

    fs.readFile("./" + req.url, function(err, data)
    {
        if(!err)
        {
            var dotoffset = req.url.lastIndexOf(".");
            var mimetype = dotoffset == -1 ? 
            "text/plain": 
            {
                ".html": "text/html",
                ".ico": "image/x-icon",
                ".jpg": "image/jpeg",
                ".png": "image/png",
                ".svg": "image/svg+xml",
                ".gif": "image/gif",
                ".css": "text/css",
                ".js": "text/javascript"
            }[req.url.substr(dotoffset)];

            if (mimetype !== undefined) 
            {
                res.setHeader("Content-type", mimetype);
            }
            else
            {
            
            }
            res.end(data);
        }
        else
        {
            res.writeHead(404, "Not Found");
            res.end();
        }
    })
}).listen(port);

console.log(`app listen at port : ${server.address().port}`);
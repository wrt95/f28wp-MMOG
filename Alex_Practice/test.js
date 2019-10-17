//function print()
//{
    //var first = "hi";

    //alert(first);
//}

import http from "http";
//var cors = require("cors");

//app.use(cors());

var svr = http.createServer(function(request, response) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.setHeader("Access-Control-Allow-Origin", "*")
response.end("Hello Web World");
})
.listen(8080);
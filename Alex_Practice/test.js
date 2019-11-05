//function print()
//{
    //var first = "hi";

    //alert(first);
//}

var http = require("http");
var fs = require('fs');

var svr = http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile('./test.html', null, function(error, data){
      if (error) {
        response.writeHead(404);
        response.write('File not found!');
      } else{
        response.write(data);
      }
      response.end();
    });
  })
  .listen(8080);
//function print()
//{
    //var first = "hi";

    //alert(first);
//}

const http = require("http");

const fs = require('fs');

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


var svr = http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    //fs.readFile('./test.html', null, function(error, data){
     // if (error) {
     //   response.writeHead(404);
       // response.write('File not found!');
      //} else{
        //response.write(data);
      //}
      //response.end();
    //});
    response.end();
  })
    router.get('/', function(req,res){
      res.sendFile(path.join(__dirname+'/test.html'));
    })
  app.use('/', router);
  app.listen(8080);
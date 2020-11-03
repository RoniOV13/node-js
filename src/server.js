var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer((request, response) => {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');

// if(req.url.indexOf('/') != -1){ 
//     const compiledFunction = pug.compileFile(process.cwd() + '/src/index1.pug')
//     const body = compiledFunction({
//       local: 'Batman'
//     });
  
//     res.writeHead(200, {
//         'Content-Length': Buffer.byteLength(body),
//         'Content-Type': 'text/html'
//       })
//       .end(body);
//     }
  
  
//   if(req.url.indexOf('.html') != -1){ 
  
//   fs.readFile(process.cwd() + '/public/index.html', function (err, data) {
//     if (err) console.log(err)
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
  
//   }
  
//   if(req.url.indexOf('.js') != -1){ 
  
//   fs.readFile(process.cwd() + '/public/script.js', function (err, data) {
//     if (err) console.log(err);
//     res.writeHead(200, {'Content-Type': 'text/javascript'});
//     res.write(data);
//     res.end();
//   });
  
//   }
  
//   if(req.url.indexOf('.css') != -1){ 
  
//   fs.readFile(process.cwd() + '/public/style.css', function (err, data) {
//     if (err) console.log(err);
//     res.writeHead(200, {'Content-Type': 'text/css'});
//     res.write(data);
//     res.end();
//   });
  
//   } 




// const compiledFunction = pug.compileFile(process.cwd() + '/src/index1.pug')
  // const body = compiledFunction({
  //   local: 'Batman'
  // });

  // res
  //   .writeHead(200, {
  //     'Content-Length': Buffer.byteLength(body),
  //     'Content-Type': 'text/html'
  //   })
  //   .end(body);
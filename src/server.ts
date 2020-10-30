import { createServer } from 'http'
import { readFile, access } from 'fs/promises'
import { readFile as oldReadFile, readdir as oldReadDir,exists, existsSync, readdirSync, lstatSync, truncate, statSync, Dir, opendirSync } from 'fs'
const pug = require('pug');
const fs = require('fs');
import {join, extname} from 'path'

const PUBLIC = process.cwd() + '/public'

console.log(PUBLIC)

async function checkIsExist(path: string) {
  try {
    console.log(path)
    // @ts-ignore
    const isExist: boolean | undefined = await access(path)
    if (isExist === false) return false
    return true
  } catch (error) {
    return false
  }
}

const search = async (filter: string, startPath: string = PUBLIC) => {
  const isExist = await checkIsExist(startPath + filter)

  console.log(`exist ${filter} - ${isExist}`)

  if (filter.split('/')[filter.split('/').length - 1].split('.').length > 1) {

    try {
      const file = await readFile(startPath + filter, "utf8")
      console.log(file)
    } catch (error) {
      console.error(error)
    }
  }
  else {
    const files = await readdirSync(startPath + filter);
    for (const file of files) {
      console.log(file);
    }
  }
}



createServer(async (req, res) => {
  console.log(`${req.method} - ${req.url}`)

  await search(req.url, PUBLIC)

 
  // let filePath = '.' + req.url;
  //   if (filePath == './')
  //       filePath = './index.html';

  //   let extname_ = extname(filePath);
  //   let contentType = 'text/html';
  //   switch (extname_) {
  //       case '.js':
  //           contentType = 'text/javascript';
  //           break;
  //       case '.css':
  //           contentType = 'text/css';
  //           break;
  //       case '.json':
  //           contentType = 'application/json';
  //           break;
  //       case '.png':
  //           contentType = 'image/png';
  //           break;      
  //       case '.jpg':
  //           contentType = 'image/jpg';
  //           break;
  //       case '.wav':
  //           contentType = 'audio/wav';
  //           break;
  //           case '.woff':
  //           contentType = 'font/woff';
  //           break;
  //       case '.woff2':
  //           contentType = 'font/woff2';
  //           break;      
  //       case '.svg':
  //           contentType = 'image/svg+xml';
  //           break;
  //       case '.gif': 
  //           contentType = 'image/gif';
  //           break;
  //   }

  //   fs.readFile(process.cwd() + '/public/path/'+ req.url, function(error, content) {
  //       if (error) {
  //           if(error.code == 'ENOENT'){
  //               fs.readFile('./404.html', function(error, content) {
  //                   res.writeHead(200, { 'Content-Type': contentType });
  //                   res.end(content, 'utf-8');
  //               });
  //           }
  //           else {
  //               res.writeHead(500);
  //               res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
  //               res.end(); 
  //           }
  //       }
  //       else {
  //           res.writeHead(200, { 'Content-Type': contentType });
  //           res.end(content, 'utf-8');
  //       }
  //   });

  const compiledFunction = pug.compileFile(process.cwd() + '/src/index1.pug')
  const body = compiledFunction({
    local: 'Batman'
  });

  res
    .writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    })
    .end(body);


  //   const json = JSON.stringify({ a: 2 });
  //   res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
  //  res.end(json);

  // res.end()

}).listen(5000, 'localhost', () => {
  console.log('server listen on http://localhost:5000/')
})

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
  let k=0;
  let filePath = '.' + req.url;
  if (filePath == './'){
     k=1;
    filePath = process.cwd()+'/src/index1.pug';
  }
 else if (filePath =='./wer.html') {filePath=process.cwd()+"/public/path/"+req.url;}
 else if (filePath =='./index2.html') {filePath=process.cwd()+"/public/"+req.url}
  else {filePath=process.cwd()+"/src/"+req.url; }


      //filePath = process.cwd()+'/src/index1.pug';
      // const compiledFunction = pug.compileFile(process.cwd() + '/src/index1.pug')
      // const body = compiledFunction({
      //   local: 'Batman'
      // });
    
      // res
      //   .writeHead(200, {
      //     'Content-Length': Buffer.byteLength(body),
      //     'Content-Type': 'text/html'
      //   })
      //   .end(body)}


    let extname1 = extname(filePath);
   let contentType = 'text/html';
      switch (extname1) {
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
              fs.readFile(process.cwd()+'/src/404.html', function(error, content) {
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(content, 'utf-8');
              });
          }
          else {
              res.writeHead(500);
              res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
              res.end(); 
          }
      }
      else {
        if (k==1) {
        const compiledFunction = pug.compileFile(process.cwd() + '/src/index1.pug')
        const body = compiledFunction({
          local: 'Batman'
        });
      
        res
          .writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/html'
          })
          .end(body)}
         else if (k==2) {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
         } 
        else{
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
      }}
  });
  

// if (filePath == './ter.json') {
      //   const json = JSON.parse(fs.readFile ('/src/ter.json', 'utf8'));
      //   res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
      //   res.end(json);

      // }

  //   const json = JSON.stringify({ a: 2 });
  //   res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
  //  res.end(json);

  // res.end()

}).listen(5000, 'localhost', () => {
  console.log('server listen on http://localhost:5000/')
})

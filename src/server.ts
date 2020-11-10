import { createServer } from 'http'
import { readFile, access } from 'fs/promises'
import { readFile as oldReadFile, readdir as oldReadDir,exists, existsSync, readdirSync, lstatSync, truncate, statSync, Dir, opendirSync } from 'fs'
const pug = require('pug');
const fs = require('fs');
import {join, extname} from 'path'
import { exit } from 'process';
import { fileURLToPath } from 'url';

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
      console.log(file);
      return file;
      } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  else {
    let arrFile:string[] = [];
    const files = await readdirSync(startPath + filter);
    for (const file of files) {
      console.log(file);
      arrFile.push(file);}
      
    return arrFile;

  }
}



createServer(async (req, res) => {
  console.log(`${req.method} - ${req.url}`)
  


//   let k=0;

//   if (filePath == './'){
//      k=1;
//     filePath = process.cwd()+'/src/index1.pug';
//   }
//  else if (filePath =='./wer.html') {filePath=process.cwd()+"/public/path/"+req.url;}
//  else if (filePath =='./index2.html') {filePath=process.cwd()+"/public/"+req.url}
//   else {filePath=process.cwd()+"/src/"+req.url; }

    let filePath = '.' + req.url;
    let extname1 = extname(filePath)
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

  if (req.url) {
    let answer = await search(req.url);
    if ( answer === undefined) {
      res.statusCode = 404;
      res.end("Resourse not found");
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(answer);
    }
  }
  else {throw new Error();}

}).listen(5000, 'localhost', () => {
  console.log('server listen on http://localhost:5000/')
})

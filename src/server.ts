import { createServer } from 'http'
import { readFile, access } from 'fs/promises'
import { readFile as oldReadFile, readdir as oldReadDir, existsSync, readdirSync, lstatSync, truncate, statSync, Dir, opendirSync } from 'fs'
const pug = require('pug');

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

  const compiledFunction = pug.compileFile('index1.pug')
  console.log(compiledFunction({
    local: 'Batman'
  }));


  // let fn = pug.compileFile('index1.pug');
  // let html = fn({ local: 'hello world' });


  //  html = pug.render('string of pug');


  // pug.renderFile('index1.pug', function(err, html) {
  //pug.send(html);
  //});

 // res.end()

}).listen(5000, 'localhost', () => {
  console.log('server listen on http://localhost:5000/')
})

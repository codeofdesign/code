const fs = require('fs')
const yaml = require('js-yaml')
const parse = require('./parse')

const dir = './dist'
const dirs = ['/json', '/yaml', '/md']

/**
 *  Make sure dirs exist
 */
if (!fs.existsSync(dir)) fs.mkdirSync(dir)
dirs.forEach(d => {
  if (!fs.existsSync(`${dir}${d}`)) {
    fs.mkdirSync(`${dir}${d}`)
  }
})


/**
 *  Write to files
 */
const writeFile = data => {
  const dataJson = JSON.stringify(data)
  const dataYaml = yaml.dump(data)

  fs.writeFile(`${dir}/json/${data.meta.id}.json`, dataJson, { flag: 'w' }, function(err) {
    if (err) return console.log(err)
    console.log(`Wrote to ${dir}/json/${data.meta.id}.json`)
  })

  fs.writeFile(`${dir}/yaml/${data.meta.id}.yml`, dataYaml, { flag: 'w' }, function(err) {
    if (err) return console.log(err)
    console.log(`Wrote to ${dir}/yaml/${data.meta.id}.yml`)
  })
}


/**
 *  Parse source md files
 *  and write to dist
 */

fs.readdir('./versions', (err, paths) => {
  if (err) return console.log(err)

  paths.forEach(p => {
    const id = p.substring(0, p.indexOf('.'))
    parse(id, writeFile)

    fs.copyFile(`./versions/${p}`, `./dist/md/${p}`, 0, (err, res) => {
      if (err) return console.log('bolle', err)
      console.log(`Wrote to ./dist/md/${p}`)
    })
  })
})
const fs = require('fs')
const yaml = require('js-yaml')
const Reader = require('line-by-line')
const parse = require('./parse')

/**
 *  Metadata
 */
const meta = {
  id: null,
  name: null,
  shortname: null,
  complete: undefined,
}

/**
 *  Contents
 */
const content = {
  title: null,
  sections: [
    // title
    // body
  ],
}

/**
 *  State
 */
let isParsingMeta = false
let hasParsedMeta = false
let hasParsedTableofContents = false
let shouldParseNewSection = false
let shouldParseLine = true


/* ================= */


/**
 *  Write to files
 */
const writeFiles = data => {
  const dir = './dist'
  const dirs = ['/json', '/yaml']

  console.log(data)

  // Make sure directories exist
  dirs.forEach(d => {
    if (!fs.existsSync(`${dir}${d}`)) {
      fs.mkdirSync(`${dir}${d}`)
    }
  })

  const dataJson = JSON.stringify(data)
  const dataYaml = yaml.dump(data)

  fs.writeFile(`${dir}/json/${data.meta.id}.json`, dataJson, { flag: 'w' }, function(err) {
    if(err) {
      return console.log(err)
    }
    console.log(`Wrote to json/${data.meta.id}.json`)
  })

  fs.writeFile(`${dir}/yaml/${data.meta.id}.yml`, dataYaml, { flag: 'w' }, function(err) {
    if(err) {
      return console.log(err)
    }
    console.log(`Wrote to yaml/${data.meta.id}.yml`)
  })
}


/* ================= */


parse('en_US', writeFiles)
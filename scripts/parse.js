/**
 *  Parse
 *  Traverses a .md file and returns an object
 */

const Reader = require('line-by-line')

const parse = (id, cb) => {

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

  /**
   *  Line parse handlers
   */
  const onLine = line => {
    switch(true) {
      case line === '---':
        if (!isParsingMeta && !hasParsedMeta) {
          isParsingMeta = true
        } else {
          isParsingMeta = false
          hasParsedMeta = true
          return
        }
        break
      case line === '' || /^\s|^</.test(line):
        shouldParseLine = false
        break
      case /^#\s/.test(line):
        // Remove '# ' part before the string
        content.title = line.substring(2)
        break
      case line === '***':
        hasParsedTableofContents = true
        break
      case /^###\s/.test(line):
        shouldParseNewSection = true
        break
      default:
        shouldParseLine = hasParsedTableofContents
        break
    }

    if (isParsingMeta) onMetaLine(line)
    else if (shouldParseNewSection) addNewSection(line)
    else if (shouldParseLine && hasParsedMeta) appendBodyToCurrentSection(line)
  }

  const onMetaLine = line => {
    const pattern = /^(.*):\s(.*)/
    const res = line.match(pattern)

    if (!res) return

    const [ _, key, val ] = res
    meta[key] = val
  }

  const addNewSection = line => {
    // Remove '### ' part of title string
    // @TODO: do this in a more future-proof way
    content.sections.push({
      title: line.substring(4),
      body: '',
    })
    shouldParseNewSection = false
  }

  const appendBodyToCurrentSection = line => {
    const len = content.sections.length-1 || 0
    content.sections[len].body += `${line} \n`
  }

  /**
   *  Line reader
   */
  const lr = new Reader(`./versions/${id}.md`)

  lr.on('line', onLine)
  lr.on('end', () => cb({ meta, content }))
}

module.exports = parse
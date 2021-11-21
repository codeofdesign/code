import { all, complete } from './versions.js'

const format = id => {
  return {
    id: id,
    complete: complete.includes(id),
    files: {
      json: `./json/${id}.json`,
      yaml: `./yaml/${id}.yml`,
      md: `./md/${id}.md`,
    },
  }
}

const vers = all.map(l => format(l))

export default {
  ids: all,
  versions: vers,
}
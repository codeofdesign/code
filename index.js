const ids = [
  'ar', 'cs', 'de_DE', 'en_US', 'es_ES',
  'es_MX', 'fa', 'fi', 'fr_FR', 'id_ID',
  'it_IT', 'ja_JP', 'nb', 'nl', 'nn', 'pl',
  'pt_BR', 'pt_PT', 'ru_RU', 'sv_SE', 'tr_TR',
]

const format = id => {
  return {
    id: id,
    complete: true,
    files: {
      json: `./json/${id}.json`,
      yaml: `./yaml/${id}.yml`,
      md: `./md/${id}.md`,
    },
  }
}

const versions = ids.map(l => format(l))

export default {
  ids,
  versions,
}
import fs from 'fs'
import path from 'path'

const getFile = (filePath: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, filePath), 'utf8', function (err, data) {
    err ? reject(err) : resolve(data)
  })
})

export default async (initial = {}) => {
  const vue = await getFile('./docs/vue.min.js')
  const axios = await getFile('./docs/axios.min.js')
  const pathToRegexp = await getFile('./docs/pathToRegexp.min.js')
  const qs = await getFile('./docs/qs.min.js')
  const html = await getFile('./docs/template.html')
  return html
    .replace('window.INITIALDATA', JSON.stringify(initial, (key, value) => {
      return typeof value === 'function' ? value.toString() : value
    }))
    .replace('window.VUE', vue)
    .replace('window.AXIOS', axios)
    .replace('window.PATHTOREGEXP', pathToRegexp)
    .replace('window.QS', qs)
}

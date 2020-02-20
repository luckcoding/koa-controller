import fs from 'fs'
import path from 'path'

let template_cache: string = ''

const getTemplate = (): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, './template.html'), 'utf8', function (err, data) {
    err ? reject(err) : resolve(data)
  })
})

export default async (initial = {}) => {
  const html = await getTemplate()
  return html.replace('window.INITIALDATA', JSON.stringify(initial, (key, value) => {
    return typeof value === 'function' ? value.toString() : value
  }))
}

import Handlebars from 'handlebars';
import helpers from '../assets/scripts/helpers';

async function _loadPartials() {
  const entries = await fg([
    path.resolve(__dirname,'../components/**/*.html'),
    path.resolve(__dirname, '../templates/**/*.html')
  ])
  console.log('Partials:', entries)
  const partials = entries.map((entry) => {
    const partialName = camelcase(path.basename(entry, '.html'))
    console.log('Partial:', partialName)
    const partialTemplate = fs.readFileSync(entry, 'utf8')
    Handlebars.registerPartial(partialName, partialTemplate)
  })
  partials.forEach((name, content) => {
    Handlebars.registerPartial(name, content)
  })
}


async function _loadHelpers() {
  for (const key in helpers.default) {
    console.log('Helper:', key)
    Handlebars.registerHelper(key, helpers[key])
  }
}

await _loadPartials()
await _loadHelpers()

export default Handlebars

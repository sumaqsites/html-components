const path = require('path')

const dir = {
  assets: path.join(process.cwd(), 'assets'),
  components: path.join(process.cwd(), 'components'),
  public: path.join(process.cwd(), 'public'),
  dist: path.join(process.cwd(), 'dist'),
  lib: path.join(process.cwd(), 'lib'),
  fractal: path.join(process.cwd(), 'fractal'),
  modules: path.join(process.cwd(), 'node_modules')
}

module.exports = { dir }
